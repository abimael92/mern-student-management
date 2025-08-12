import express from "express";
import {
    getAllClasses,
    createClass,
    updateClass,
    assignRoomToClass,
    assignCourseToClass,
    deleteClass,
} from "./classes.controller.js";
import {
    validateCreateClass,
    validateUpdateClass,
} from "./class.validations.js";

const router = express.Router();

// ----- READ -----
router.get("/", getAllClasses);

// ----- CREATE -----
router.post('/', validateCreateClass, createClass);

// ----- UPDATE -----
router.put('/:id', validateUpdateClass, updateClass);
router.put("/:id/assign-room", assignRoomToClass);
router.put("/:id/assign-course", assignCourseToClass);

// ----- DELETE -----
router.delete("/:id", deleteClass);

export default router;
