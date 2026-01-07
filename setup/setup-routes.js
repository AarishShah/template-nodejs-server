
import { errorHandler } from "../middlewares/error-handler.js";
import { notFoundHandler } from "../middlewares/not-found.js";
import systemRoutes from "../routes/system.routes.js";
import { router } from "../routes/index.js";

export function setupRoutes(app, config) {

    app.use("/api", router);

    app.use("/", systemRoutes);
    app.use(notFoundHandler);
    app.use(errorHandler);
}
