import express from 'express';
import {
    getAllTeachers,
    createTeacher
} from '../controllers/teachers/teacher.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllTeachers);
router.post('/', protect, createTeacher);

export default router;