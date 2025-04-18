import { body, param } from 'express-validator';
import Teacher from '../models/Teacher';

// Common validation rules
const nameRule = (field) =>
    body(field)
        .trim()
        .notEmpty().withMessage(`${field} is required`)
        .isLength({ min: 2, max: 50 }).withMessage(`${field} must be 2-50 characters`)
        .escape();

const emailRule = () =>
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
        .custom(async (email) => {
            const exists = await Teacher.exists({ email });
            if (exists) throw new Error('Email already in use');
            return true;
        });

const phoneRule = () =>
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone is required')
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).withMessage('Invalid phone number');

const subjectRule = () =>
    body('subjects')
        .isArray({ min: 1 }).withMessage('At least one subject is required')
        .custom((subjects) => {
            const validSubjects = ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages'];
            return subjects.every(sub => validSubjects.includes(sub));
        }).withMessage('Invalid subject provided');

// Create Teacher Validations
export const createTeacherValidations = [
    nameRule('firstName'),
    nameRule('lastName'),
    emailRule(),
    phoneRule(),
    subjectRule(),

    body('qualifications')
        .isArray({ min: 1 }).withMessage('At least one qualification is required')
        .custom((quals) => {
            const validQuals = ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma'];
            return quals.every(q => validQuals.includes(q));
        }).withMessage('Invalid qualification provided'),

    body('joiningDate')
        .notEmpty().withMessage('Joining date is required')
        .isISO8601().withMessage('Invalid date format')
        .toDate(),

    body('address.street').optional().trim().isLength({ max: 100 }).escape(),
    body('address.city').optional().trim().isLength({ max: 50 }).escape(),
    body('address.state').optional().trim().isLength({ max: 50 }).escape(),
    body('address.zipCode').optional().trim().isLength({ max: 20 }).escape(),
    body('address.country').optional().trim().isLength({ max: 50 }).escape(),

    body('emergencyContact.name').optional().trim().isLength({ max: 100 }).escape(),
    body('emergencyContact.relation').optional().trim().isLength({ max: 50 }).escape(),
    body('emergencyContact.phone').optional().trim().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).withMessage('Invalid phone number'),

    body('profilePicture').optional().isURL().withMessage('Invalid profile picture URL')
];

// Update Teacher Validations
export const updateTeacherValidations = [
    param('id')
        .isMongoId().withMessage('Invalid teacher ID format')
        .custom(async (id) => {
            const exists = await Teacher.exists({ _id: id });
            if (!exists) throw new Error('Teacher not found');
            return true;
        }),

    nameRule('firstName').optional(),
    nameRule('lastName').optional(),
    phoneRule().optional(),
    subjectRule().optional(),

    body('email').not().exists().withMessage('Email cannot be updated'),
    body('joiningDate').not().exists().withMessage('Joining date cannot be updated'),

    body('qualifications')
        .optional()
        .isArray({ min: 1 }).withMessage('At least one qualification is required')
        .custom((quals) => {
            const validQuals = ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma'];
            return quals.every(q => validQuals.includes(q));
        }).withMessage('Invalid qualification provided'),

    // Include all other optional validations from create
    ...createTeacherValidations.slice(5).map(validation => validation.optional())
];

// Vacation Validations
export const vacationValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID'),

    body('startDate')
        .notEmpty().withMessage('Start date is required')
        .isISO8601().withMessage('Invalid start date format')
        .toDate(),

    body('endDate')
        .notEmpty().withMessage('End date is required')
        .isISO8601().withMessage('Invalid end date format')
        .toDate()
        .custom((endDate, { req }) => {
            if (endDate <= req.body.startDate) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),

    body('type')
        .optional()
        .isIn(['paid', 'unpaid', 'sick']).withMessage('Invalid vacation type')
];

// Performance Review Validations
export const performanceReviewValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID'),

    body('reviewer')
        .notEmpty().withMessage('Reviewer is required')
        .isMongoId().withMessage('Invalid reviewer ID'),

    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),

    body('comments').optional().trim().isLength({ max: 500 }).escape()
];

// Attendance Validations
export const attendanceValidations = [
    param('id').isMongoId().withMessage('Invalid teacher ID'),

    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['present', 'absent', 'late', 'on leave']).withMessage('Invalid status'),

    body('notes').optional().trim().isLength({ max: 200 }).escape()
];

// Validation middleware
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};