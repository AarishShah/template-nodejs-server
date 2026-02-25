# Middlewares (`src/middlewares`)

Middlewares are functions that have access to the `req` (request) and `res` (response) objects, and the `next` function in the application’s request-response cycle. They execute code *before* the request hits the Controller.

## Core Middlewares

- **`auth.js` (`authenticateService`)**: Blocks requests without valid authentication tokens. Usually applied globally in `routes/index.js`.
- **`validate.js`**: Takes a `Joi` schema (from `src/validations`) and validates `req.body`, `req.query`, or `req.params`. If the validation fails, it immediately sends a `400 Bad Request` with exact details of what field was wrong, bypassing the Controller entirely.
- **`error-handler.js`**: The global safety net. Any error thrown anywhere in the application (and caught by `catchError`) eventually lands here. This file guarantees that internal server errors are logged but never leak sensitive stack traces to the user.
- **`not-found.js`**: Handles `404` errors gracefully when a user hits a URL path that doesn't map to any physical route logic.


---

[⬅️ Previous: Models](./04-models.md) | [Next: Routes ➡️](./06-routes.md)
