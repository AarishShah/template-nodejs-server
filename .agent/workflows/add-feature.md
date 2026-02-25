---
description: Automatically scaffolds all necessary layered files to add a new REST resource.
---

# Add New Feature Workflow

Follow these sequential steps when a user asks you to create a new resource (e.g., "Posts", "Users", "Comments"). 
This workflow ensures the strict Controller-Service-Model layered architecture is followed perfectly.

1. **Create the Model**
   Create the database schema in `src/models/[resource].model.js`. Make sure to use Mongoose, define strict types, and include `timestamps`.

2. **Create the Validation Schema**
   Create `src/validations/[resource].validations.js`. Use Joi to define the exact shape of `body`, `query`, or `params` for the upcoming routes.

3. **Create the Service**
   Create `src/services/[resource].service.js`. Implement the business logic and database interactions here. *Do not include any HTTP `req`/`res` objects here.*

4. **Create the Controller**
   Create `src/controllers/[resource].controller.js`. 
   - Wrap all methods in `catchError`.
   - Extract data from the request.
   - Call the Service methods.
   - Return responses using `ApiResponse`.

5. **Create the Routes**
   Create `src/routes/v1/[resource].routes.js`.
   - Chain express router verbs (e.g. `.get().post()`).
   - Import and apply the Joi validations using the `validate()` middleware.
   - Bind to the Controller functions.

6. **Register the Routes**
   Open `src/routes/index.js` and mount the new resource router into the main router tree.
