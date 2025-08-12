import express from "express";
import {
    getSubjects,
    getSubjectWithSemester,
    createSubject,
    updateSubject,
    assignSemesterToSubject,
    deleteSubject
} from "./subject.controller.js";

const router = express.Router();

// ----- READ -----
router.get("/", getSubjects);
router.get("/:id/with-semester", getSubjectWithSemester);

// ----- CREATE -----
router.post("/", createSubject);

// ----- UPDATE -----
router.put("/:id", updateSubject);
router.put("/:id/assign-semester", assignSemesterToSubject);

// ----- DELETE -----
router.delete("/:id", deleteSubject);

export default router;
