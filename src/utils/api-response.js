
export class ApiResponse {

    static send(res, { data = null, meta = {}, status = 200 }, message = '') {
        return res.status(status).json({
            success: status >= 200 && status < 300,
            status,
            message,
            ...meta,
            data,
        });
    }

    static success(res, { data = null, meta = {} }, message = 'Success') {
        return this.send(res, { data, meta, status: 200 }, message);
    }

    static created(res, { data = null, meta = {} }, message = 'Resource created successfully') {
        return this.send(res, { data, meta, status: 201 }, message);
    }

    static badRequest(res, { data = null, meta = {} }, message = 'Bad request') {
        return this.send(res, { data, meta, status: 400 }, message);
    }

    static unauthorized(res, { data = null, meta = {} }, message = 'Unauthorized') {
        return this.send(res, { data, meta, status: 401 }, message);
    }

    static forbidden(res, { data = null, meta = {} }, message = 'Forbidden') {
        return this.send(res, { data, meta, status: 403 }, message);
    }

    static notFound(res, { data = null, meta = {} }, message = 'Resource not found') {
        return this.send(res, { data, meta, status: 404 }, message);
    }

    static conflict(res, { data = null, meta = {} }, message = 'Conflict') {
        return this.send(res, { data, meta, status: 409 }, message);
    }

    static serverError(res, { data = null, meta = {} }, message = 'Internal server error') {
        return this.send(res, { data, meta, status: 500 }, message);
    }
}
