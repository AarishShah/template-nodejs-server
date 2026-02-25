import rateLimit from 'express-rate-limit';

/**
 * Creates a rate limiter middleware
 * @param {number} windowMs Time frame for which requests are checked/remembered
 * @param {number} max Max number of connections during windowMs before sending a 429 response
 * @param {string} message Optional custom message
 */
export const createRateLimiter = (windowMs, max, message = 'Too many requests, please try again later.') => {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: {
            status: 429,
            error: message
        }
    });
};

// Application specific limiters
export const healthRateLimiter = createRateLimiter(1000, 1, 'Too many health checks, please try again in a second.');
export const generalRateLimiter = createRateLimiter(15 * 60 * 1000, 100); // 15 minutes, 100 requests
export const vulnLimiter = createRateLimiter(60 * 1000, 50, "Too many vulnerability requests"); // 1 minute, 50 requests
export const remediationLimiter = createRateLimiter(60 * 1000, 20, "Too many remediation requests"); // 1 minute, 20 requests
