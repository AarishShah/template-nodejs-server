# Errors, Utilities & Validations (`src/errors`, `src/utils`, `src/validations`)

These supporting folders contain the shared glue that keeps the application stable, readable, and consistent.

## Errors (`src/errors`)
- **`ApiError`**: A custom `Error` class that adds an HTTP `statusCode` and optional data. If a specific business case fails (e.g., "User not found"), the service can throw a `new ApiError(404, "User not found")`.
- **`catchError`**: A higher-order wrapper function for Async Controllers. It automatically catches any thrown `Promises` and routes them straight to `next()`, meaning you never need to write clunky `try/catch` blocks inside your `Controllers` again.

## Utilities (`src/utils`)
- **`ApiResponse`**: Every successful HTTP response or error response across the entire application uses this class. 
  - Why? Because frontends and mobile apps expect identical JSON payloads everywhere.
  - Usage: `ApiResponse.success(res, data)` or `ApiResponse.created(res, data)`. Always use this!
- **`rate-limiter.js`**: Reusable configurations for `express-rate-limit` to block malicious users from spamming the API endpoints.

## Validations (`src/validations`)
- Contains purely definitive schemas written with **Joi** (a JavaScript validation library).
- Rather than checking `if (!req.body.title)` in a controller, we define a blueprint of what a valid Vulnerability looks like. The `validate` middleware in routes intercepts the request and ensures these schemas are strictly obeyed.


---

[⬅️ Previous: Services](./08-services.md) | [Next: The Request Lifecycle ➡️](./10-request-lifecycle.md)
