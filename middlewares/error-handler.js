
export function notFoundHandler(req, res, next) {
    res.status(404).json({ error: "Not Found" });
}

export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        data: null
    });
}
