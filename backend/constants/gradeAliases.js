// ===== ./backend/constants/gradeAliases.js =====
export const GRADE_ALIASES = {
    // Naruto Ninja Ranks
    NARUTO: {
        'Academy Student': ['Kindergarten', '1st', '2nd'],
        'Genin': ['6th', '7th', '8th'],           // Middle School
        'Chunin': ['9th', '10th'],                // Early High School
        'Jonin': ['11th', '12th'],                // Senior High School
        'Special Jonin': ['12th'],                // Honors
        'Kage': ['12th'],                         // Valedictorian equivalent
    },

    // Real-world common aliases
    COMMON: {
        'Freshman': '9th',
        'Sophomore': '10th',
        'Junior': '11th',
        'Senior': '12th',
        'Elementary': ['Kindergarten', '1st', '2nd', '3rd', '4th', '5th'],
        'Middle School': ['6th', '7th', '8th'],
        'High School': ['9th', '10th', '11th', '12th'],
    },

    // UK/AUS system
    BRITISH: {
        'Year 7': '6th',
        'Year 8': '7th',
        'Year 9': '8th',
        'Year 10': '9th',
        'Year 11': '10th',
        'Year 12': '11th',
        'Year 13': '12th',
    }
};

// Helper function
export const getAliasForGrade = (gradeLevel, system = 'NARUTO') => {
    const aliases = GRADE_ALIASES[system];
    if (!aliases) return null;

    for (const [alias, grades] of Object.entries(aliases)) {
        if (Array.isArray(grades)) {
            if (grades.includes(gradeLevel)) return alias;
        } else if (grades === gradeLevel) {
            return alias;
        }
    }
    return null;
};