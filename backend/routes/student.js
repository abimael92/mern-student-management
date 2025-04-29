import express from "express";
import {
    getStudents,
    createStudent,
    deleteStudent,
    getLastStudentNumber,
    updateStudent,
} from "../controllers/student.js";

const router = express.Router();

router.get('/students', getStudents);


router.post('/students', createStudent);
router.get('/students/lastStudentNumber', getLastStudentNumber);

router.put('/students/:id', updateStudent);

router.delete('/students/:id', deleteStudent);


export default router;
