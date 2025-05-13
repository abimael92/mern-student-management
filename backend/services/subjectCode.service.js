import Subject from '../models/subject.schema.js';

// Generate subject code based on subject name and year
export const generateSubjectCode = async (subjectName) => {
    const abbr = subjectName.trim().slice(0, 3).toUpperCase();
    const yearPrefix = new Date().getFullYear();

    try {
        // Find the last subject code starting with the current year and having 3 digits after
        const lastSubject = await Subject.findOne({
            subjectCode: { $regex: `^${abbr}${yearPrefix}\\d{3}$` },
        })
            .sort({ subjectCode: -1 })  // Sort by subjectCode in descending order
            .limit(1);

        if (!lastSubject) {
            // If no subjects are found, return the first code with 001
            return `${abbr}${yearPrefix}001`;
        }

        // Extract the last number from the last subject code
        const lastIndex = parseInt(lastSubject.subjectCode.slice(-3), 10);  // Get the last 3 digits as an integer
        const newNumber = (lastIndex + 1).toString().padStart(3, '0');  // Increment and pad with leading zeros

        // Return the new code
        return `${abbr}${yearPrefix}${newNumber}`;
    } catch (error) {
        console.error('Error generating subject code:', error);
        throw new Error('Failed to generate subject code');
    }
};


