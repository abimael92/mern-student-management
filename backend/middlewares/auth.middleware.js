import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import logger from '../config/logger.js';

export const protect = (req, res, next) => {
    // 1. Get token and check if it exists
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        logger.warn('Authentication attempt without token', {
            ip: req.ip,
            path: req.originalUrl,
            method: req.method
        });
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2. Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.warn('Invalid token attempt', {
                ip: req.ip,
                token: token.substring(0, 10) + '...', // Log partial token for debugging
                error: err.message
            });
            return next(new AppError('Invalid token. Please log in again!', 401));
        }

        // 3. Check if user still exists (you would add this if you have user model)
        // const currentUser = await User.findById(decoded.id);
        // if (!currentUser) {
        //     return next(new AppError('The user belonging to this token no longer exists.', 401));
        // }

        // 4. Check if user changed password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //     return next(new AppError('User recently changed password! Please log in again.', 401));
        // }

        // 5. Grant access to protected route
        req.user = decoded;
        logger.info('Successful authentication', {
            userId: decoded.id,
            ip: req.ip
        });
        next();
    });
};

// Role-based authorization
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            logger.warn('Unauthorized role attempt', {
                userId: req.user.id,
                requiredRoles: roles,
                userRole: req.user.role
            });
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};