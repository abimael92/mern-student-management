// backend/constants/enums.js

export const GenderEnum = ['male', 'female', 'other', 'prefer-not-to-say'];

export const GradeEnum = [
    'Kindergarten', '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th', '11th', '12th'
];

// If you want numeric grades:
export const GradeLevels = Array.from({ length: 12 }, (_, i) => i + 1);

// export const SubjectEnum = [
//     'Math', 'Science', 'English', 'History', 'Art',
//     'Music', 'PE', 'Computers', 'Languages',
// ];

export const QualificationEnum = [
    'Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma',
];

export const StatusEnum = [
    'active', 'retired', 'on leave',
];

export const AttendanceStatusEnum = [
    'present',
    'absent',
    'late',
    'on leave',
];
