import express from "express";
import { check } from 'express-validator';  // Validation
import { getStudents, createStudent, deleteStudent } from '../controllers/student.js';

const router = express.Router();

router.get('/', getStudents);

router.post(
    '/',
    [
        check('regNo').isNumeric().withMessage('Registration number must be a number'),
        check('studentName').not().isEmpty().withMessage('Student name is required'),
        check('grade').optional().isLength({ min: 1 }).withMessage('Grade must be a valid string')
    ],
    createStudent
);

router.delete('/:id', deleteStudent);

export default router;
