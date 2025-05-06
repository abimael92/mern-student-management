import Teacher from '../../models/teacher.schema.js';
import { validationResult } from 'express-validator';

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