import express from 'express';
import {
    getAllTeachers,
    createTeacher
} from '../controllers/teachers/teacher.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllTeachers);
router.post('/', authMiddleware.protect, createTeacher);

export default router;