import logger from '../config/logger.js';

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        logger.error(err.stack);
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
