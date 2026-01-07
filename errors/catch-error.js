

export function catchError(controller) {
    return async (req, res, next) => {
        await controller(req, res, next).catch(err => next(err));
    }
}
