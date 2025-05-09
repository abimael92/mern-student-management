import express from "express";
import {
    getTeachers,
    getLastTeacherNumber,
    createTeacher,
    updateTeacher,
    updateTeacherStatus,
    deleteTeacher
} from "../controllers/teachers/teacher.controller.js";


const router = express.Router();


// ----- READ -----
router.get("/", getTeachers);


router.get("/lastTeacher", getLastTeacherNumber);

// ----- CREATE -----
router.post("/", createTeacher);

// ----- UPDATE -----
router.put("/:id", updateTeacher);
router.patch("/:id/status", updateTeacherStatus);

// ----- DELETE -----
router.delete("/:id", deleteTeacher);




export default router;