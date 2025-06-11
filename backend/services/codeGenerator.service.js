import Subject from '../models/subject.schema.js';
import Course from '../models/course.schema.js';

export const generateSubjectCode = async (subjectName) => {
    const abbr = subjectName.trim().slice(0, 4).toUpperCase();
    const yearPrefix = new Date().getFullYear();

    try {
        const lastSubject = await Subject.findOne({
            subjectCode: { $regex: `^${abbr}${yearPrefix}\\d{3}$` },
        }).sort({ subjectCode: -1 });

        if (!lastSubject) return `${abbr}${yearPrefix}001`;

        const lastIndex = parseInt(lastSubject.subjectCode.slice(-3), 10);  // 🛠️ Fixed: lastSubject.code -> lastSubject.subjectCode
        const newNumber = (lastIndex + 1).toString().padStart(3, '0');

        return `${abbr}${yearPrefix}${newNumber}`;
    } catch (error) {
        console.error('Error generating subject code:', error);
        throw new Error('Failed to generate subject code');
    }
};

export const generateCourseCode = async (courseName) => {
    if (!courseName || typeof courseName !== 'string') {
        throw new Error('Invalid course name provided');
    }

    const abbr = courseName.trim().slice(0, 4).toUpperCase();
    const yearPrefix = new Date().getFullYear();

    try {
        const lastCourse = await Course.findOne({
            courseCode: { $regex: `^${abbr}${yearPrefix}\\d{3}$` },
        }).sort({ courseCode: -1 });

        if (!lastCourse) return `${abbr}${yearPrefix}001`;

        const lastIndex = parseInt(lastCourse.courseCode.slice(-3), 10);
        const newNumber = (lastIndex + 1).toString().padStart(3, '0');

        return `${abbr}${yearPrefix}${newNumber}`;
    } catch (error) {
        console.error('Error generating course code:', error);
        throw new Error('Failed to generate course code');
    }
};
