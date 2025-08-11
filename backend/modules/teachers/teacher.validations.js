import { body, param, validationResult } from 'express-validator';
import Teacher from '../models/Teacher';

// Helper: reusable name validation
const nameRule = (field) =>
    body(field)
        .trim()
        .notEmpty().withMessage(`${field} is required`)
        .isLength({ min: 2, max: 50 }).withMessage(`${field} must be between 2 and 50 characters`)
        .escape();

// Email validation with async uniqueness check
const emailRule = () =>
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
        .custom(async (email, { req }) => {
            // For update, allow same email if unchanged
            if (req.method === 'PUT' || req.method === 'PATCH') {
                const teacher = await Teacher.findById(req.params.id);
                if (teacher && teacher.email === email) return true;
            }
            const exists = await Teacher.exists({ email });
            if (exists) throw new Error('Email already in use');
            return true;
        });

// Phone number validation, international-friendly regex
const phoneRule = () =>
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone is required')
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/).withMessage('Invalid phone number');

// Subjects validation with allowed list
const subjectRule = () =>
    body('subjects')
        .isArray({ min: 1 }).withMessage('At least one subject is required')
        .custom((subjects) => {
            const validSubjects = ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages'];
            if (!subjects.every(sub => validSubjects.includes(sub))) {
                throw new Error('One or more invalid subjects provided');
            }
            return true;
        });

// Qualification validation with allowed degrees
const qualificationRule = () =>
    body('qualifications')
        .isArray({ min: 1 }).withMessage('At least one qualification is required')
        .custom((quals) => {
            const validQuals = ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma'];
            if (!quals.every(q => validQuals.includes(q))) {
                throw new Error('One or more invalid qualifications provided');
            }
            return true;
        });

// Address nested validation helper (optional fields, max length)
const addressFields = ['street', 'city', 'state', 'zipCode', 'country'];
const addressRules = addressFields.map(field =>
    body(`address.${field}`).optional().trim().isLength({ max: field === 'street' ? 100 : 50 }).escape()
);

// Emergency contact validation (all optional)
const emergencyContactRules = [
    body('emergencyContact.name').optional().trim().isLength({ max: 100 }).escape(),
    body('emergencyContact.relation').optional().trim().isLength({ max: 50 }).escape(),
    body('emergencyContact.phone').optional().trim()
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/).withMessage('Invalid emergency contact phone number'),
];

// Validate date with ISO8601 and convert to Date object
const dateRule = (field, required = true) => {
    const rule = body(field)
        .isISO8601().withMessage(`Invalid ${field} format`)
        .toDate();
    return required ? rule.notEmpty().withMessage(`${field} is required`) : rule.optional();
};

// Profile picture URL validation (optional)
const profilePictureRule = body('profilePicture').optional().isURL().withMessage('Invalid profile picture URL');

// ------------------
// Create Teacher Validations
// ------------------
export const createTeacherValidations = [
    nameRule('firstName'),
    nameRule('lastName'),
    emailRule(),
    phoneRule(),
    subjectRule(),
    qualificationRule(),
    dateRule('joiningDate'),
    ...addressRules,
    ...emergencyContactRules,
    profilePictureRule,
];

// ------------------
// Update Teacher Validations
// ------------------
export const updateTeacherValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID format')
        .custom(async (id) => {
            if (!(await Teacher.exists({ _id: id }))) {
                throw new Error('Teacher not found');
            }
            return true;
        }),
    // Optional fields but validated if present
    nameRule('firstName').optional(),
    nameRule('lastName').optional(),
    phoneRule().optional(),
    subjectRule().optional(),
    qualificationRule().optional(),
    ...addressRules.map(rule => rule.optional()),
    ...emergencyContactRules.map(rule => rule.optional()),
    profilePictureRule.optional(),

    // Disallow email and joiningDate update for safety
    body('email').not().exists().withMessage('Email cannot be updated'),
    body('joiningDate').not().exists().withMessage('Joining date cannot be updated'),
];

// ------------------
// Vacation Validations
// ------------------
export const vacationValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID'),
    dateRule('startDate'),
    dateRule('endDate'),
    body('endDate').custom((endDate, { req }) => {
        if (endDate <= req.body.startDate) {
            throw new Error('End date must be after start date');
        }
        return true;
    }),
    body('type').optional().isIn(['paid', 'unpaid', 'sick']).withMessage('Invalid vacation type'),
];

// ------------------
// Performance Review Validations
// ------------------
export const performanceReviewValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID'),
    body('reviewer').notEmpty().withMessage('Reviewer is required').isMongoId().withMessage('Invalid reviewer ID'),
    body('rating').notEmpty().withMessage('Rating is required').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comments').optional().trim().isLength({ max: 500 }).escape(),
];

// ------------------
// Attendance Validations
// ------------------
export const attendanceValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID'),
    body('status').notEmpty().withMessage('Status is required')
        .isIn(['present', 'absent', 'late', 'on leave']).withMessage('Invalid attendance status'),
    body('notes').optional().trim().isLength({ max: 200 }).escape(),
];

// ------------------
// Middleware to send validation errors in clean format
// ------------------
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }
    next();
};
