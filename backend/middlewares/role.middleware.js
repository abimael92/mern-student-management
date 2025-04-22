// backend/middlewares/role.middleware.js
export default (roles) => {
    return (req, res, next) => {
        // Assuming the user role is attached to req.user
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
