import express from "express";
import {
    getAllClasses,
    createClass,
    updateClass,
    assignRoomToClass,
    assignCourseToClass,
    deleteClass,
} from "../controllers/classes/classes.controller.js";

const router = express.Router();

// ----- READ -----
router.get("/", getAllClasses);

// ----- CREATE -----
router.post("/", createClass);

// ----- UPDATE -----
router.put("/:id", updateClass);
router.put("/:id/assign-room", assignRoomToClass);
router.put("/:id/assign-course", assignCourseToClass);

// ----- DELETE -----
router.delete("/:id", deleteClass);

export default router;
