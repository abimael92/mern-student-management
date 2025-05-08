
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { generateTeacherNumber } from '../../services/teacherNumber.service.js';
import Teacher from '../../models/teacher.schema.js';

export const getTeachers = async (req, res) => {
    try {
        console.log("Fetching teachers...");
        const teachers = await Teacher.find().select('-__v').lean();
        console.log("Teachers fetched:", teachers);
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET /teachers/lastTeacherNumber
export const getLastTeacherNumber = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const prefix = `TC${currentYear}`;
        const lastTeacher = await Teacher.find({
            teacherNumber: { $regex: `^${prefix}` }
        }).sort({ teacherNumber: -1 }).limit(1);

        let nextNumber = 1;
        if (lastTeacher.length > 0) {
            const lastNum = parseInt(lastTeacher[0].teacherNumber.split('-')[1], 10);
            nextNumber = lastNum + 1;
        }

        const nextTeacherNumber = `${prefix}-${nextNumber.toString().padStart(3, '0')}`;
        res.status(200).json({ teacherNumber: nextTeacherNumber });
    } catch (error) {
        console.error("Error generating teacher number:", error);
        res.status(500).json({ error: "Failed to generate teacher number" });
    }
};

// ----- CREATE -----
// POST /teachers
export const createTeacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstName,
        lastName,
        profilePicture,
        subjects,
        email,
        isEmployed,
    } = req.body;

    try {
        const teacherNumber = await generateTeacherNumber();

        const newTeacher = new Teacher({
            teacherNumber,
            firstName,
            lastName,
            profilePicture,
            subjects,
            email,
            isEmployed,
            employmentDate: new Date(),
        });

        await newTeacher.save();
        res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
    } catch (error) {
        console.error("Error creating teacher:", error);
        res.status(500).json({ error: 'There was an error creating the teacher.' });
    }
};

// ----- UPDATE -----
export const updateTeacher = async (req, res) => {
    const { id: teacherId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, req.body, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(updatedTeacher);
    } catch (err) {
        console.error('Error updating teacher:', err);
        res.status(500).json({ message: 'Error updating teacher' });
    }
};

// PATCH /teachers/:id/status
export const updateTeacherStatus = async (req, res) => {
    const { id } = req.params;
    const { isEmployed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { isEmployed },
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json(updatedTeacher);
    } catch (error) {
        console.error('Error updating teacher status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ----- DELETE -----
export const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: `Teacher with ID ${id} not found` });
        }

        res.status(200).json({ message: `Successfully deleted teacher with ID ${id}` });
    } catch (error) {
        logger.error(`Error deleting teacher with ID ${id}: ${error.message}`, {
            method: req.method,
            route: req.originalUrl,
            params: req.params
        });
        res.status(500).json({ message: 'Internal server error' });
    }
};
