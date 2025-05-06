import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import Student from '../models/student.js';
import logger from '../utils/logger.js';
import { generateStudentNumber } from '../services/studentNumber.service.js';

// ----- READ -----

// GET /students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-__v').lean();
        res.status(200).json(students);
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// GET /students/lastStudentNumber
export const getLastStudentNumber = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const prefix = `ST${currentYear}`;
        const lastStudent = await Student.find({
            studentNumber: { $regex: `^${prefix}` }
        }).sort({ studentNumber: -1 }).limit(1);

        let nextNumber = 1;
        if (lastStudent.length > 0) {
            const lastNum = parseInt(lastStudent[0].studentNumber.split('-')[1], 10);
            nextNumber = lastNum + 1;
        }

        const nextStudentNumber = `${prefix}-${nextNumber.toString().padStart(3, '0')}`;
        res.status(200).json({ studentNumber: nextStudentNumber });
    } catch (error) {
        console.error("Error generating student number:", error);
        res.status(500).json({ error: "Failed to generate student number" });
    }
};

// ----- CREATE -----

// POST /students
export const createStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstName, lastName, profilePicture, age, grade, tutor, emergencyContact,
        dateOfBirth, nationality, contactInfo, address, isEnrolled
    } = req.body;

    try {
        const studentNumber = await generateStudentNumber();

        const newStudent = new Student({
            studentNumber,
            firstName,
            lastName,
            profilePicture,
            age,
            grade,
            tutor,
            emergencyContact,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            nationality,
            contactInfo,
            address,
            isEnrolled,
            enrollmentDate: new Date(),
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: 'There was an error creating the student.' });
    }
};

// ----- UPDATE -----



export const updateStudent = async (req, res) => {
    const { id: studentId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ message: 'Error updating student' });
    }
};



// export const upt = async (req, res) => {
//     const { id } = req.params;
//     const updates = { ...req.body };
//     delete updates._id;

//     // if (!mongoose.Types.ObjectId.isValid(id)) {
//     //     return res.status(400).json({ message: 'Invalid student ID format' });
//     // }
//     console.log('this is expected id: ', id);
//     if (!id) {  // use 'id' instead of 'studentId'
//         console.error('Student ID is missing');
//         return res.status(400).json({ message: 'Student ID is required' });
//     }


//     try {
//         const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
//             new: true,
//             runValidators: true
//         });

//         if (!updatedStudent) {
//             return res.status(404).json({ message: `Student with ID ${id} not found` });
//         }

//         res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
//     } catch (error) {
//         console.error("Error updating student:", error);
//         res.status(500).json({ error: "Failed to update student", details: error.message });
//     }
// };

// PATCH /students/:id/status
export const updateStudentStatus = async (req, res) => {
    const { id } = req.params;
    const { isEnrolled } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid student ID format' });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { isEnrolled },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ----- DELETE -----

// DELETE /students/:id
export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid student ID format' });
    }

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: `Student with ID ${id} not found` });
        }

        res.status(200).json({ message: `Successfully deleted student with ID ${id}` });
    } catch (error) {
        logger.error(`Error deleting student with ID ${id}: ${error.message}`, {
            method: req.method,
            route: req.originalUrl,
            params: req.params
        });
        res.status(500).json({ message: 'Internal server error' });
    }
};
