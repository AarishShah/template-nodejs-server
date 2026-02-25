import Joi from 'joi';

export const remediationValidation = {
    createRemediation: Joi.object({
        vulnerabilityId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'any.required': 'Vulnerability ID is required',
                'string.pattern.base': 'Invalid Vulnerability ID format'
            }),
        strategy: Joi.string()
            .trim()
            .required()
            .messages({
                'any.required': 'Strategy is required',
                'string.empty': 'Strategy cannot be empty'
            })
    }).unknown(true)
};
