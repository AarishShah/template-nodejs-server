# Controllers (`src/controllers`)

Controllers sit exactly between the raw HTTP Request (`req`, `res`) and the application's Business Logic (the **Services**).

## Core Practices

1. **No Business Logic**: Controllers should **only** extract data from the request (`req.body`, `req.params`), pass it to a Service, and then format the response based on what the Service returns.
2. **Static Classes**: Controllers are implemented as Classes with `static` methods. This namespaces the functions logically and prevents the need to constantly instantiate objects.
3. **`catchError` wrapper**: **Always** wrap asynchronous controller methods with the `catchError` utility. This ensures that any unhandled exceptions are automatically forwarded to the global error middleware (preventing the Node.js process from crashing or hanging).
4. **`ApiResponse` standard**: Never manually construct `res.status().json()`. Always use static methods from the `ApiResponse` utility to ensure JSON responses are strictly identical in shape.

## Example

**`src/controllers/vulnerability.controller.js`**
```javascript
import { VulnerabilityService } from "../services/vulnerability.service.js";
import { catchError } from "../errors/catch-error.js";
import { ApiResponse } from "../utils/api-response.js";

export class VulnerabilityController {

    // 1. Wrap in catchError
    static createVulnerability = catchError(async (req, res, next) => {
        // 2. Extract Data
        const payload = req.body;
        
        // 3. Call Service (No business logic here!)
        const data = await VulnerabilityService.createVulnerability(payload);
        
        // 4. Standardized Response
        return ApiResponse.created(res, { data }, "Vulnerability created successfully");
    });
}
```


---

[⬅️ Previous: Routes](./06-routes.md) | [Next: Services ➡️](./08-services.md)
