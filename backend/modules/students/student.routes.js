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

const router = express.Router();

// ----- READ -----
router.get("/", getStudents);
router.get("/lastStudentNumber", getLastStudentNumber);

// ----- CREATE -----
router.post("/", createStudent);

// ----- UPDATE -----
router.put("/:id", updateStudent);
router.put('/:id/assign', assignStudentToClass);
router.patch("/:id/status", updateStudentStatus);

// ----- DELETE -----
router.delete("/:id", deleteStudent);

export default router;
