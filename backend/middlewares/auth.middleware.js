import logger from '../config/logger.js';

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error conditionally based on environment
    if (process.env.LOG_ERRORS === 'true') {
        logger.error(err.stack);  // Log stack trace if LOG_ERRORS is true
    }

    // Send response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default globalErrorHandler;
