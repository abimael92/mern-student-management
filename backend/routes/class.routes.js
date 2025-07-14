import express from "express";
import {
    getAllClasses,
    createClass,
    updateClass,
    deleteClass,
} from "../controllers/classes/classes.controller.js";

const router = express.Router();

// ----- READ -----
router.get("/", getAllClasses);

// ----- CREATE -----
router.post("/", createClass);

// ----- UPDATE -----
router.put("/:id", updateClass);

// ----- DELETE -----
router.delete("/:id", deleteClass);

export default router;
