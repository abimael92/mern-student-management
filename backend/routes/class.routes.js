import express from "express";
import {
    getClasses,
    createClass,
    updateClass,
    deleteClass,
} from "../controllers/subject/subject.controller.js";

const router = express.Router();

// ----- READ -----
router.get("/", getClasses);

// ----- CREATE -----
router.post("/", createClass);

// ----- UPDATE -----
router.put("/:id", updateClass);

// ----- DELETE -----
router.delete("/:id", deleteClass);

export default router;
