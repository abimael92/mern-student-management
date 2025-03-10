import Student from '../models/student.js'; // Make sure the import matches the model export
import { validationResult } from 'express-validator';
import logger from '../utils/logger.js';

// GET /students - Fetch all students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find(); // Ensure Student is correctly imported
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch students" });
    }
};

// POST /students - Create a new student
export const createStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        studentNumber, firstName, lastName, age, grade, tutor, emergencyContact,
        dateOfBirth, nationality, contactInfo, address, isEnrolled
    } = req.body;

    try {
        const newStudent = new Student({
            studentNumber,
            firstName,
            lastName,
            age,
            grade,
            tutor,
            emergencyContact,
            dateOfBirth,
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



// DELETE /students/:id - Delete a student by ID
export const deleteStudent = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedStudent = await Student.findByIdAndRemove(id); // Corrected from StudentData to Student
        if (!deletedStudent) {
            return res.status(404).json({ message: `Student with ID ${id} not found` });
        }
        res.status(200).json({ message: `Successfully deleted student with ID ${id}` });
    } catch (error) {
        logger.error(`Error deleting student with ID ${id}: ${error.message}`, { method: req.method, route: req.originalUrl, params: req.params });
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /students/lastStudentNumber - Fetch the last student number
export const getLastStudentNumber = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const yearPrefix = `ST${currentYear}`;

        const lastStudent = await Student.find({ studentNumber: { $regex: `^${yearPrefix}` } })
            .sort({ studentNumber: -1 })
            .limit(1)
            .exec();

        if (!lastStudent.length) {
            return res.status(404).json({ message: 'No students found with the given pattern.' });
        }

        // Return only the last student number
        res.status(200).json({ lastStudentNumber: lastStudent[0].studentNumber });
    } catch (error) {
        console.error("Error fetching the last student number:", error);
        res.status(500).json({ error: "Failed to fetch the last student number" });
    }
};

