// backend/middlewares/sanitize.middleware.js
import mongoSanitize from 'express-mongo-sanitize';

const sanitizeMiddleware = mongoSanitize();

export default sanitizeMiddleware;
