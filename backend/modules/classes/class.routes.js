import express from "express";
import {
    getClasses,
    createClass,
    updateClass,
    assignRoomToClass,
    assignCourseToClass,
    addTemporaryBooking,
    deleteClass,
} from "./class.controller.js";
import {
    validateCreateClass,
    validateUpdateClass,
    validateRequest,
    addTemporaryBookingSchema,
} from "./class.validations.js";

const router = express.Router();

// ----- READ -----
router.get("/", getClasses);

// ----- CREATE -----
router.post('/', validateCreateClass, createClass);
router.post(
    '/:classId/temporary-bookings',
    validateRequest(addTemporaryBookingSchema), // Add Joi validation if needed
    addTemporaryBooking
);

// ----- UPDATE -----
router.put('/:id', validateUpdateClass, updateClass);
router.put("/:id/assign-room", assignRoomToClass);
router.put("/:id/assign-course", assignCourseToClass);


// ----- DELETE -----
router.delete("/:id", deleteClass);

export default router;
