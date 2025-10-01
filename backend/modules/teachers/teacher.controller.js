
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { generateTeacherNumber } from './teacher.service.js';
import Teacher from './teacher.schema.js';
import Class from '../classes/class.schema.js';

// ----- CREATE -----
export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select('-__v').lean();
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
        isActive,
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
            isActive,
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
    const { teacherData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    if (teacherData.tutorId === "") {
        teacherData.tutorId = null;
    }



    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, teacherData, { new: true });

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(updatedTeacher);
    } catch (err) {
        console.error('Error updating teacher:', err);
        res.status(500).json({ message: 'Error updating teacher' });
    }
};

// GET /teachers
export const assignTeacherToClass = async (req, res) => {
    try {
        const { id: teacherId } = req.params;
        const { targetType, targetId: classId } = req.body;

        if (targetType !== 'classes') {
            return res.status(400).json({ error: 'Teachers can only be assigned to classes' });
        }

        if (!Class) {
            throw new Error('Class model not initialized');
        }

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(teacherId) || !mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Verify both teacher and class exist
        const [teacherExists, classExists] = await Promise.all([
            Teacher.exists({ _id: teacherId }),
            Class.exists({ _id: classId })
        ]);

        if (!teacherExists) return res.status(404).json({ error: 'Teacher not found' });
        if (!classExists) return res.status(404).json({ error: 'Class not found' });

        // Use transaction for atomic updates
        const session = await mongoose.startSession();
        session.startTransaction();


        try {
            // Find the current teacher of this class (if any)
            const currentClass = await Class.findById(classId).session(session);
            const currentTeacherId = currentClass?.teacher;

            // Remove this class from the current teacher's classes array
            if (currentTeacherId && currentTeacherId.toString() !== teacherId) {
                await Teacher.findByIdAndUpdate(
                    currentTeacherId,
                    { $pull: { classes: classId } },
                    { session }
                );
            }

            //  Update the class with the new teacher
            const updatedClass = await Class.findByIdAndUpdate(
                classId,
                { teacher: teacherId },
                { new: true, session }
            ).populate('teacher');

            //  Update the new teacher's classes array
            await Teacher.findByIdAndUpdate(
                teacherId,
                {
                    $addToSet: { classes: classId },
                },
                { new: true, session }
            );

            await session.commitTransaction();
            res.json(updatedClass);
        } catch (transactionError) {
            await session.abortTransaction();
            throw transactionError;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error('Teacher assignment error:', error);
        res.status(500).json({
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// PATCH /teachers/:id/status
export const updateTeacherStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { isActive },
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
        console.error(`Error deleting teacher with ID ${id}: ${error.message}`, {
            method: req.method,
            route: req.originalUrl,
            params: req.params
        });
        res.status(500).json({ message: 'Internal server error' });
    }
};
