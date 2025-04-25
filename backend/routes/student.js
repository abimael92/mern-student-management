import express from "express";
import {
    getStudents,
    createStudent,
    deleteStudent,
    getLastStudentNumber,
    updateStudent,
} from "../controllers/student.js";

const router = express.Router();

router.get('/students', getStudents); // ✅ Use the controller directly


router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);
router.get('/students/lastStudentNumber', getLastStudentNumber);
router.put('/students/:id', updateStudent);

export default router;
