import Student from '../models/student.schema.js';

export const generateStudentNumber = async () => {
    const currentYear = new Date().getFullYear();
    const lastStudent = await Student.findOne().sort({ studentNumber: -1 });

    if (!lastStudent) {
        return `${currentYear}0001`;
    }

    const lastNumber = parseInt(lastStudent.studentNumber.slice(-4));
    return `${currentYear}${(lastNumber + 1).toString().padStart(4, '0')}`;
};