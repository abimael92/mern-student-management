import Subject from '../models/subject.schema.js';
import Course from '../models/course.schema.js';


const generateSubjectAbbr = (name) => {
    if (!name) return '';

    const words = name.trim().split(' ').filter(Boolean);
    const abbrParts = [];

    // Get first 3 chars of first two words (skip first word if < 3 chars)
    for (let i = 0; i < words.length && abbrParts.length < 2; i++) {
        if (words[i].length >= 3) {
            abbrParts.push(words[i].slice(0, 3).toUpperCase());
        }
    }

    // If only one abbreviation found, try adding words with < 3 chars as well
    if (abbrParts.length < 2) {
        for (let i = 0; i < words.length && abbrParts.length < 2; i++) {
            if (words[i].length < 3) {
                abbrParts.push(words[i].slice(0, 3).toUpperCase());
            }
        }
    }

    return abbrParts.join('');
};

export const generateSubjectCode = async (subjectName) => {
    const abbr = generateSubjectAbbr(subjectName);
    const yearPrefix = new Date().getFullYear();

    try {
        // Regex to match codes starting with abbreviation + year + 3 digits
        const regex = new RegExp(`^${abbr}${yearPrefix}\\d{3}$`);

        // Find last subject by code descending order
        const lastSubject = await Subject.findOne({
            subjectCode: { $regex: regex },
        }).sort({ subjectCode: -1 });

        if (!lastSubject) {
            return `${abbr}${yearPrefix}001`;
        }

        // Parse last 3 digits and increment
        const lastIndex = parseInt(lastSubject.subjectCode.slice(-3), 10);
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
