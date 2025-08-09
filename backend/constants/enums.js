// backend/constants/enums.js

export const GenderEnum = ['male', 'female', 'other', 'prefer-not-to-say'];

export const GradeEnum = [
    'Kindergarten', '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th', '11th', '12th'
];

// If you want numeric grades:
export const GradeLevels = Array.from({ length: 12 }, (_, i) => i + 1);
