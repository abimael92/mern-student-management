import express from "express";
import { check } from 'express-validator';  // Validation
import { getStudents, createStudent, deleteStudent, getLastStudentNumber, updateStudent } from '../controllers/student.js';

const router = express.Router();

router.get('/', getStudents); // Adjust this based on your controller

router.post('/', createStudent);

router.delete('/:id', deleteStudent);

router.get('/lastStudentNumber', getLastStudentNumber);

router.put('/:id', updateStudent);

export default router;
