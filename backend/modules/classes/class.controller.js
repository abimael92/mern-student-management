import Class from './class.schema.js';
import mongoose from "mongoose";
import { generateClassCode } from './class.services.js';

export const getClasses = async (req, res) => {
    const classes = await Class.find().lean(); // Remove all populates/formatting
    res.json(classes || []); // Force array return
};


export const createClass = async (req, res) => {
    try {
        // Generate class code if not provided
        const classData = {
            ...req.body,
            code: req.body.code || await generateClassCode(req.body.name),
            schedule: req.body.schedule || undefined
        };

        const newClass = await Class.create(classData);
        res.status(201).json(newClass);
    } catch (error) {
        // Handle duplicate class code error specifically
        if (error.code === 11000 && error.keyPattern?.classCode) {
            return res.status(400).json({
                error: "Class code already exists. Try again or provide a different code."
            });
        }
        res.status(400).json({ error: error.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedClass) return res.status(404).json({ error: "Class not found" });
        res.json(updatedClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) return res.status(404).json({ error: "Class not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// In your classes.controller.js
export const assignRoomToClass = async (req, res) => {
    try {
        const { roomId } = req.body;
        const classId = req.params.id;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: "Invalid class ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ error: "Invalid room ID" });
        }

        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { room: roomId },
            { new: true }
        ).populate('room');

        if (!updatedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const assignCourseToClass = async (req, res) => {
    try {
        const { courseId } = req.body;
        const classId = req.params.id;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: "Invalid class ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { course: courseId },
            { new: true }
        ).populate('course');

        if (!updatedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addTemporaryBooking = async (req, res) => {
    try {
        const { classId } = req.params;
        const { roomId, day, startTime, endTime, reason } = req.body;

        // 1. Get the class and its DEFAULT room
        const classObj = await Class.findById(classId);
        if (!classObj) throw new Error("Class not found");

        // 2. Check target room availability
        const Room = mongoose.model('Room');
        const conflicts = await Room.find({
            _id: roomId,
            currentOccupancy: {
                $elemMatch: {
                    'schedule.day': day,
                    'schedule.active': true,
                    $or: [
                        { 'schedule.startTime': { $lt: endTime, $gte: startTime } },
                        { 'schedule.endTime': { $gt: startTime, $lte: endTime } }
                    ]
                }
            }
        });

        if (conflicts.length > 0) {
            throw new Error("Room already booked for this time");
        }

        // 3. Add to room's occupancy
        await Room.findByIdAndUpdate(roomId, {
            $push: {
                currentOccupancy: {
                    period: classObj.academicPeriod,
                    schedule: { day, startTime, endTime, active: true },
                    class: classId,
                    isTemporary: true,
                    exceptionDetails: {
                        reason,
                        originalRoom: classObj.room  // Track original location
                    }
                }
            }
        });

        res.json({
            success: true,
            message: `Temporarily booked ${roomId} for ${reason}`
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};