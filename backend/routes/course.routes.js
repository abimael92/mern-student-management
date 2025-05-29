import express from "express";
import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/course/course.controller.js';

const router = express.Router();

// ----- READ -----
router.get("/", getCourses);

// ----- CREATE -----
router.post("/", createCourse);

// ----- UPDATE -----
router.put("/:id", updateCourse);

// ----- DELETE -----
router.delete("/:id", deleteCourse);

export default router;
