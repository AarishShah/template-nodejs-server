# The Request Lifecycle (A Dry Run)

To fully understand how all the folders in the `src/` directory interact, let's walk through the exact journey of a network request hitting the application.

## Example: Creating a new Vulnerability

A user sends a `POST /v1/vulnerabilities` request to the server with a JSON body `{ "title": "SQL Injection" }`.

1. **The Entry Point (`app.js` & `src/setup`)**
   - The server is listening. `app.js` receives the raw TCP connection. 
   - Express parses the JSON payload and attaches it to `req.body`.
   ```json
   // req.body looks like this:
   {
       "title": "SQL Injection"
   }
   ```
   
2. **Global Middlewares (`src/routes/index.js`)**
   - **Auth**: The `authenticateService` middleware checks the headers. 
     ```http
     POST /v1/vulnerabilities HTTP/1.1
     Authorization: Bearer my-secret-token
     ```
     *Are they allowed? Yes. Let them pass. The middleware attaches user/org info to `req.authenticatedService`.*
   - **Rate Limiting**: `vulnLimiter` checks if the user is spamming the API. They are under the 50 req/min limit.
   
3. **The Router & Validator (`src/routes/v1/vulnerability.routes.js`)**
   - The Router sees a `POST` request matching `/`. 
   - Before hitting the Route Controller, `validate(vulnerabilityValidation.createVulnerability)` intercepts it. It checks the `Joi` blueprint:
     ```javascript
     // src/validations/vulnerability.validations.js
     createVulnerability: {
         body: Joi.object().keys({
             title: Joi.string().required(),
             description: Joi.string(),
             severity: Joi.string().valid('Low', 'Medium', 'High', 'Critical')
         })
     }
     ```
     *Is `title` a string? Yes. Let them pass.*
     *(If they had passed `"severity": "Super Bad"`, the validator would reject it here with a 400 error).*
   
4. **The Controller (`src/controllers/vulnerability.controller.js`)**
   - The Controller receives the cleaned, validated request.
   - It delegates the heavy lifting to the Service: 
     ```javascript
     const data = await VulnerabilityService.createVulnerability(req.body);
     ```
   
5. **The Service & Database (`src/services/vulnerability.service.js`)**
   - The Service receives the data payload. It instantiates a new database **Model**. Mongoose applies its strict Schema rules and default values (like adding `createdAt` and default `status`):
     ```javascript
     const vulnerability = new Vulnerability({ title: "SQL Injection" });
     await vulnerability.save();
     
     // The saved document now looks like:
     // {
     //   "_id": "60d5ecb8b392...",
     //   "title": "SQL Injection",
     //   "severity": "Low",          <-- automatically added by default
     //   "status": "Open",           <-- automatically added by default
     //   "createdAt": "2023-10-...", <-- automatically added
     //   "__v": 0
     // }
     ```
   - The Service returns the newly created item back to the Controller.
   
6. **The Response (`src/utils/api-response.js`)**
   - The Controller receives the Database record back from the Service.
   - The Controller fires `ApiResponse.created(res, { data })`. 
   - The user immediately receives a `201 Created` Standardized JSON response:
     ```json
     {
         "success": true,
         "message": "Vulnerability created successfully",
         "data": {
             "_id": "60d5ecb8b392...",
             "title": "SQL Injection",
             "severity": "Low",
             "status": "Open",
             "createdAt": "2023-10-..."
         }
     }
     ```

### What if something went wrong?

If the Database failed or timed out during **Step 5**:
- An error is thrown by Mongoose.
- The `catchError` wrapper around the Controller immediately catches the crash in **Step 4**.
- It passes the crash to the `error-handler.js` global middleware (**Step 2**).
- The Global Error Handler formats the crashed Database string into a safe, generic `500 Internal Server Error` and sends it to the user via `ApiResponse`:
  ```json
  {
      "success": false,
      "message": "Internal Server Error"
  }
  ```

The Node process never crashes. The user never sees a database stack trace. Everything is contained.


---

[⬅️ Previous: Utilities & Errors](./09-utilities-and-errors.md)
