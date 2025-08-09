import express from "express";
import {
    getStudents,             // READ: Get all students
    getLastStudentNumber,    // READ: Get last student number
    createStudent,           // CREATE: Add new student
    updateStudent,           // UPDATE: Update student info
    assignStudentToClass,    // UPDATE: Assign student to class
    updateStudentStatus,     // UPDATE: Toggle enrollment status
    deleteStudent,           // DELETE: Remove student
} from "./student.controller.js";

import {
    validateCreateStudent,
    validateUpdateStudent,
} from './student.validations.js';

const router = express.Router();

// ----- READ -----
router.get("/", getStudents);
router.get("/lastStudentNumber", getLastStudentNumber);

// ----- CREATE -----
router.post("/", validateCreateStudent, createStudent);

// ----- UPDATE -----
router.put("/:id", validateUpdateStudent, updateStudent);
router.put('/:id/assign', assignStudentToClass);  // No validation here, add if needed
router.patch("/:id/status", updateStudentStatus); // No validation here, add if needed

// ----- DELETE -----
router.delete("/:id", deleteStudent);

export default router;
