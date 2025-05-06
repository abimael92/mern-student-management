import express from "express";
import {
    getStudents,             // READ: Get all students
    getLastStudentNumber,    // READ: Get last student number
    createStudent,           // CREATE: Add new student
    updateStudent,           // UPDATE: Update student info
    updateStudentStatus,     // UPDATE: Toggle enrollment status
    deleteStudent,           // DELETE: Remove student
} from "../controllers/student.js";

const router = express.Router();

// ----- READ -----
router.get("/students", getStudents);
router.get("/students/lastStudentNumber", getLastStudentNumber);

// ----- CREATE -----
router.post("/students", createStudent);

// ----- UPDATE -----
router.put("/students/:id", updateStudent);
router.patch("/students/:id/status", updateStudentStatus);

// ----- DELETE -----
router.delete("/students/:id", deleteStudent);

export default router;
