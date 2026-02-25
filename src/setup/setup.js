import { setupMiddlewares } from "./setup-middlewares.js";
import { setupRoutes } from "./setup-routes.js";


export function setupApp(app, config) {

    setupMiddlewares(app, config);
    setupRoutes(app, config);

}
