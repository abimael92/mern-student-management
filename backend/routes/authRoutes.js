import express from 'express';
import { login, register, logout, me } from '../controllers/authController.js';
import { authRequired } from '../middleware/auth.js';
import { restrictTo } from '../middleware/rbac.js';
import { validate, JoiSchemas } from '../middleware/validate.js';
import { loginLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/login', loginLimiter, validate(JoiSchemas.login), login);
router.post('/register', authRequired, restrictTo('admin'), validate(JoiSchemas.registerUser), register);
router.post('/logout', authRequired, logout);
router.get('/me', authRequired, me);

export default router;

