# Setup (`src/setup`)

The `src/setup` directory is responsible for bootstrapping the application. Rather than crowding `app.js` with dozens of configuration lines for middlewares and routes, we abstract this initialization into dedicated setup scripts.

## Core Benefit
- Clean, readable `app.js` entry point.
- Easy to add new global middlewares or route groups by just modifying the relevant setup file.

## Example Usage

**`src/setup/setup.js`**
```javascript
import { setupMiddlewares } from "./setup-middlewares.js";
import { setupRoutes } from "./setup-routes.js";

// Called directly from app.js
export function setupApp(app, config) {
    setupMiddlewares(app, config);
    setupRoutes(app, config);
}
```

In `app.js`, it looks like this:
```javascript
import express from 'express';
import { Config } from "./src/config/env.js";
import { setupApp } from "./src/setup/setup.js";

Config.check();
const app = express();

// Initialize everything!
setupApp(app, Config);
```


---

[⬅️ Previous: Architecture & Preface](./01-architecture.md) | [Next: Configuration ➡️](./03-config.md)
