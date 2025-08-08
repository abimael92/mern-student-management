import express from "express";
import {
    getCourses,
    getCourseWithSubjects,
    createCourse,
    updateCourse,
    assignSubjectToCourse,
    deleteCourse,
} from '../controllers/course/course.controller.js';

const router = express.Router();

// ----- READ -----
router.get("/", getCourses);
router.get("/:id/with-subjects", getCourseWithSubjects);

// ----- CREATE -----
router.post("/", createCourse);

// ----- UPDATE -----
router.put("/:id", updateCourse);
router.put("/:id/assign-subject", assignSubjectToCourse); // New endpoint

// ----- DELETE -----
router.delete("/:id", deleteCourse);



export default router;
