import express from 'express';
import {
    login,
    register,
    logout,
    me,
    refresh,
    revokeAllTokens,
    getMySessions,
    revokeSession
} from '../controllers/authController.js';
import { authRequired } from '../middleware/auth.js';
import { restrictTo } from '../middleware/rbac.js';
import { validate, JoiSchemas } from '../middleware/validate.js';
import { loginLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
router.post('/login', loginLimiter, validate(JoiSchemas.login), login);
router.post('/refresh', refresh);

// ==================== PROTECTED ROUTES (Any authenticated user) ====================
router.post('/logout', authRequired, logout);
router.get('/me', authRequired, me);
router.get('/sessions', authRequired, getMySessions);
router.delete('/sessions/:tokenId', authRequired, revokeSession);

// ==================== ADMIN ONLY ROUTES ====================
router.post('/register', authRequired, restrictTo('admin'), validate(JoiSchemas.registerUser), register);
router.post('/revoke-all', authRequired, restrictTo('admin'), revokeAllTokens);

// TEMPORARY DEBUG ROUTE - Remove after testing
router.get('/debug-users', async (req, res) => {
    try {
        const User = (await import('../models/User.js')).default;
        const users = await User.find({}).select('username email role');
        res.json({
            count: users.length,
            users: users.map(u => ({ email: u.email, username: u.username, role: u.role }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;