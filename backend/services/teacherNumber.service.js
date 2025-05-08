import Teacher from '../models/teacher.schema.js';

export const generateTeacherNumber = async () => {
    const currentYear = new Date().getFullYear();
    const yearPrefix = `TC${currentYear}`;

    try {
        const lastTeacher = await Teacher.findOne({
            teacherNumber: { $regex: `^${yearPrefix}-\\d{3}$` },
        })
            .sort({ teacherNumber: -1 })
            .limit(1);

        if (!lastTeacher) {
            return `${yearPrefix}-001`;
        }

        const lastNumber = parseInt(lastTeacher.teacherNumber.split('-')[1], 10);
        const newNumber = (lastNumber + 1).toString().padStart(3, '0');

        return `${yearPrefix}-${newNumber}`;
    } catch (error) {
        console.error('Error generating teacher number:', error);
        throw new Error('Failed to generate teacher number');
    }
};

