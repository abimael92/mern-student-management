import Subject from '../models/subject.schema.js';

export const generateSubjectCode = async (subjectName) => {
    const abbr = subjectName.trim().slice(0, 4).toUpperCase();
    const yearPrefix = new Date().getFullYear();

    try {
        const lastSubject = await Subject.findOne({
            subjectCode: { $regex: `^${abbr}${yearPrefix}\\d{3}$` },
        })
            .sort({ subjectCode: -1 })  // Sort by subjectCode in descending order

        if (!lastSubject) return `${abbr}${yearPrefix}001`;

        console.log('Found lastSubject:', `${lastSubject.code}`);

        const lastIndex = parseInt(lastSubject.code.slice(-3), 10);
        const newNumber = (lastIndex + 1).toString().padStart(3, '0');

        return `${abbr}${yearPrefix}${newNumber}`;
    } catch (error) {
        console.error('Error generating subject code:', error);
        throw new Error('Failed to generate subject code');
    }
};


