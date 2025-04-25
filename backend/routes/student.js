import express from "express";
import { check } from 'express-validator';
import { getStudents, createStudent, deleteStudent, getLastStudentNumber, updateStudent } from '../controllers/student.js';

const router = express.Router();

router.get('/api/students', getStudents);

router.post('/api/students', createStudent);

router.delete('/api/students/:id', deleteStudent);

router.get('/api/students/lastStudentNumber', getLastStudentNumber);

router.put('/api/students/:id', updateStudent);

export default router;
