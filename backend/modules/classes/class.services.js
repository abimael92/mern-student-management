import Class from './class.schema.js';

const generateClassAbbr = (name) => {
    if (!name) return '';

    const words = name.trim().split(/\s+/).filter(Boolean);
    let abbrParts = [];

    // Get first 3 chars of first two qualifying words
    for (const word of words) {
        if (word.length >= 3 && abbrParts.length < 2) {
            abbrParts.push(word.slice(0, 3).toUpperCase());
        }
    }

    // Fallback to shorter words if needed
    if (abbrParts.length < 2) {
        for (const word of words) {
            if (word.length < 3 && abbrParts.length < 2) {
                abbrParts.push(word.slice(0, 3).toUpperCase().padEnd(3, 'X'));
            }
        }
    }

    // Ensure we always have 6 characters
    return (abbrParts.join('') + 'XXX').slice(0, 6);
};

export const generateClassCode = async (className) => {
    const abbr = generateClassAbbr(className);
    const yearPrefix = new Date().getFullYear().toString().slice(-2); // Use last 2 digits of year

    try {
        const regex = new RegExp(`^${abbr}${yearPrefix}\\d{3}$`);
        const lastClass = await Class.findOne({ classCode: regex })
            .sort({ classCode: -1 })
            .select('classCode')
            .lean();

        const lastNumber = lastClass
            ? parseInt(lastClass.classCode.slice(-3), 10)
            : 0;

        // Ensure we don't exceed 999
        const newNumber = Math.min(lastNumber + 1, 999)
            .toString()
            .padStart(3, '0');

        return `${abbr}${yearPrefix}${newNumber}`;
    } catch (error) {
        console.error('Error generating class code:', error);
        throw new Error('Failed to generate class code');
    }
};