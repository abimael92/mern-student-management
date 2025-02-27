import express from "express";
import { check } from 'express-validator';  // Validation
import { getStudents, createStudent, deleteStudent, getLastStudentNumber } from '../controllers/student.js';

const router = express.Router();

router.get('/', getStudents); // Adjust this based on your controller

router.post('/', createStudent);

router.delete('/:id', deleteStudent);

router.get('/lastStudentNumber', getLastStudentNumber);  // New route

export default router;
