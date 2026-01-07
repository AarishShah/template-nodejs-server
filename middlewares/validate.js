
import { ApiError } from '../errors/api-error.js';

export const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const validationOptions = {
            abortEarly: false, // Get all errors, not just the first one
            allowUnknown: true, // This is for front-end to send extra fields
            stripUnknown: false // Don't remove unknown fields
        };

        if (!schema) return next();

        const { error } = schema.validate(req[property], validationOptions);

        if (error) {
            const errorMessage = error.details
                .map(detail => detail.message)
                .join(', ');
            return next(ApiError.badRequest(errorMessage));
        }

        next();
    };
};
