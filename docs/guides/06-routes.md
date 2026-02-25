# Routes (`src/routes`)

The routing layer maps HTTP endpoints (e.g., `GET /vulnerabilities`) to specific **Controllers**. It is also the designated place to apply validation and middlewares (like authentication or rate limiting).

## Core Practices

1. **Versioning**: Group routes by version (e.g., `src/routes/v1/`). This allows the API to evolve without breaking existing clients.
2. **Centralized Router (`index.js`)**: All sub-routes (vulnerabilities, remediations) flow into a master `index.js` file. This makes it trivial to apply global middlewares (like `authenticateService`) or global rate limits.
3. **Chaining Methods**: To keep route definitions clean, chain HTTP verbs off the `router` when possible.
4. **Validation Integration**: Always use the `validate` middleware directly inside the route definition to ensure bad data is rejected *before* it reaches the Controller.

## Example

**`src/routes/v1/vulnerability.routes.js`**
```javascript
import express from "express";
import { VulnerabilityController } from "../../controllers/vulnerability.controller.js";
import { validate } from "../../middlewares/validate.js";
import { vulnerabilityValidation } from "../../validations/vulnerability.validations.js";

const router = express.Router();

// Notice the clean chaining and inline validation
router
    .get("/",
        validate(vulnerabilityValidation.getVulnerabilitiesQuery, "query"),
        VulnerabilityController.getVulnerabilities
    )
    .post("/",
        validate(vulnerabilityValidation.createVulnerability, "body"),
        VulnerabilityController.createVulnerability
    )
    .get("/:id", VulnerabilityController.getVulnerabilityById);

export default router;
```

**`src/routes/index.js`**
```javascript
import express from "express";
import { authenticateService } from "../middlewares/auth.js";
import vulnerabilities from "./v1/vulnerability.routes.js";
import { vulnLimiter } from "../utils/rate-limiter.js";

export const router = express.Router();

// Apply Auth Globally
router.use(authenticateService());

// Apply Rate Limit & Register specific path
router.use("/v1/vulnerabilities", vulnLimiter, vulnerabilities);
```


---

[⬅️ Previous: Middlewares](./05-middlewares.md) | [Next: Controllers ➡️](./07-controllers.md)
