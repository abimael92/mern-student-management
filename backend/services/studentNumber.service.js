import Student from '../models/student.js';

export const generateStudentNumber = async () => {
    const currentYear = new Date().getFullYear();
    const yearPrefix = `ST${currentYear}`;

    try {
        const lastStudent = await Student.findOne({
            studentNumber: { $regex: `^${yearPrefix}-\\d{3}$` },
        })
            .sort({ studentNumber: -1 })
            .limit(1);

        if (!lastStudent) {
            return `${yearPrefix}-001`;
        }

        const lastNumber = parseInt(lastStudent.studentNumber.split('-')[1], 10);
        const newNumber = (lastNumber + 1).toString().padStart(3, '0');

        return `${yearPrefix}-${newNumber}`;
    } catch (error) {
        console.error('Error generating student number:', error);
        throw new Error('Failed to generate student number');
    }
};
