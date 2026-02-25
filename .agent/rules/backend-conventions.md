# Backend Node.js Architecture Rules

When modifying or writing code for this project, you MUST strictly adhere to the following Workspace Rules.

## 1. Controller Constraints
- **NO Business Logic**: Controllers must ONLY extract data from `req`, call the Service, and return a formatted `ApiResponse`.
- **Async Wrapping**: Every async controller function MUST be wrapped in `catchError` from `src/errors/catch-error.js`.
- **Response Formatting**: You MUST return responses using the `ApiResponse` utility (e.g., `ApiResponse.success`, `ApiResponse.created`). NEVER use `res.json()` or `res.send()` natively.

## 2. Service Constraints
- **Pure Business Logic**: Services interact with Mongoose Models and handle all mathematical, formational, or business logic.
- **HTTP Ignorance**: Services MUST remain completely ignorant of HTTP context. Do not pass `req` or `res` into a Service. 

## 3. Route Constraints
- **Validation Middleware**: Routes MUST validate incoming data utilizing `validate(schema)` from `src/middlewares/validate.js` before hitting the controller.
- **Joi Schemas**: Validation schemas MUST be defined in `src/validations/` using Joi.

## 4. Configuration
- **No process.env**: You MUST NOT read `process.env` directly in any file outside of `src/config/env.js`. 
- **appConfig Import**: Always import and use `appConfig` from `src/config/app-config.js` for environment variables.

## 5. Mongoose Models
- Use the standard Mongoose Schema definitions. Always include timestamps. Exports must be uppercase (e.g., `export const User = mongoose.model("User", schema);`).

*Tip: If you need to understand the deeper philosophy behind these rules, read the Markdown guides within `docs/guides/`.*
