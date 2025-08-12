import Class from './class.schema.js';
import mongoose from "mongoose";
import { generateClassCode } from './class.services.js';

export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find()
            .populate('course', 'name')
            .populate('teacher', 'firstName lastName')
            .populate('room', 'name');

        // console.log("Sample class data:", JSON.stringify(classes[0], null, 2));
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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