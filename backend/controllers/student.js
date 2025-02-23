import StudentData from "../models/student.js";
import { validationResult } from 'express-validator'; // For validation results

// Logging setup with winston
import logger from '../utils/logger.js';

export const getStudents = async (req, res) => {
    try {
        const allStudents = await StudentData.find();
        res.status(200).json(allStudents);
    } catch (error) {
        logger.error(`Error fetching students: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createStudent = async (req, res) => {
    const errors = validationResult(req);  // Check validation
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const student = req.body;

    const newStudent = new StudentData(student);

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        logger.error(`Error creating student: ${error.message}`);
        res.status(409).json({ message: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedStudent = await StudentData.findByIdAndRemove(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(202).json({ message: `Successfully deleted student ${id}` });
    } catch (error) {
        logger.error(`Error deleting student ${id}: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
