import logger from '../config/logger.js';

const requestLogger = (context = 'API') => {
    return (req, res, next) => {
        const start = Date.now();

        // Log request details
        logger.info(`${context} Request`, {
            method: req.method,
            path: req.path,
            ip: req.ip,
            user: req.user?.id || 'anonymous',
            userAgent: req.get('user-agent'),
            referrer: req.get('referrer'),
            params: req.params,
            query: req.query
        });

        // Capture response details when finished
        res.on('finish', () => {
            const duration = Date.now() - start;
            logger.info(`${context} Response`, {
                status: res.statusCode,
                duration: `${duration}ms`,
                contentLength: res.get('content-length') || '0',
                userId: req.user?.id || 'anonymous'
            });
        });

        next();
    };
};

export default requestLogger;