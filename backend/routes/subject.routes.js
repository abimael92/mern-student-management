import express from "express";
import {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject
} from "../controllers/subject/subject.controller.js";

const router = express.Router();

// ----- READ -----
router.get("/", getSubjects);

// ----- CREATE -----
router.post("/", createSubject);

// ----- UPDATE -----
router.put("/:id", updateSubject);

// ----- DELETE -----
router.delete("/:id", deleteSubject);

export default router;
