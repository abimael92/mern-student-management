import Course from './course.schema.js';

// Generate course abbreviation from course name
const generateCourseAbbr = (name) => {
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

export const generateCourseCode = async (courseName) => {
    if (!courseName || typeof courseName !== 'string') {
        throw new Error('Invalid course name provided');
    }

    // Use the smart abbreviation
    const abbr = generateCourseAbbr(courseName);
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
