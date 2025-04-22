import { body, param } from 'express-validator';
import Student from '../../models/student.schema.js';

// ==================== VALIDATION HELPERS ====================
const validateIdExists = async (value) => {
    const exists = await Student.exists({ _id: value });
    if (!exists) throw new Error('Student not found');
    return true;
};

const notEmpty = (field) =>
    body(field).notEmpty().withMessage(`${field.split('.').pop()} is required`);

const optionalField = (field, type = 'string') => {
    const base = body(field).optional();
    return type === 'string'
        ? base.trim().escape()
        : base;
};

// ==================== FIELD VALIDATIONS ====================
const baseValidations = [
    notEmpty('firstName')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),

    notEmpty('lastName')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),

    optionalField('age')
        .isInt({ min: 4, max: 25 }).withMessage('Age must be 4-25 years'),

    optionalField('grade')
        .isIn(['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'N/A'])
        .withMessage('Invalid grade level'),

    optionalField('tutor')
        .isLength({ max: 100 }).withMessage('Tutor name too long')
];

const emergencyContactValidations = [
    notEmpty('emergencyContact.name')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),

    notEmpty('emergencyContact.relation')
        .isLength({ min: 2, max: 50 }).withMessage('Relation must be 2-50 characters'),

    notEmpty('emergencyContact.phone')
        .isLength({ min: 5, max: 20 }).withMessage('Phone must be 5-20 characters')
];

const contactValidations = [
    optionalField('contactInfo.phone')
        .isLength({ min: 5, max: 20 }).withMessage('Phone must be 5-20 characters'),

    optionalField('contactInfo.email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
        .isLength({ max: 100 }).withMessage('Email too long')
];

const addressValidations = [
    optionalField('address.street')
        .isLength({ max: 200 }).withMessage('Street too long'),

    optionalField('address.city')
        .isLength({ max: 100 }).withMessage('City name too long'),

    optionalField('address.state')
        .isLength({ max: 100 }).withMessage('State name too long'),

    optionalField('address.zipCode')
        .isLength({ max: 20 }).withMessage('Zip code too long'),

    optionalField('address.country')
        .isLength({ max: 100 }).withMessage('Country name too long')
];

// ==================== EXPORTED VALIDATIONS ====================
export const createStudentValidations = [
    ...baseValidations,
    ...emergencyContactValidations,
    ...contactValidations,
    ...addressValidations,

    notEmpty('dateOfBirth')
        .isISO8601().withMessage('Invalid date (YYYY-MM-DD)')
        .toDate(),

    notEmpty('nationality')
        .isLength({ max: 100 }).withMessage('Nationality too long')
];

export const updateStudentValidations = [
    param('id')
        .isMongoId().withMessage('Invalid ID format')
        .custom(validateIdExists),

    // Protected fields
    body('studentNumber').not().exists().withMessage('Cannot modify student number'),
    body('enrollmentDate').not().exists().withMessage('Cannot modify enrollment date'),
    body('createdAt').not().exists().withMessage('Cannot modify creation date'),
    body('updatedAt').not().exists().withMessage('Cannot modify update timestamp'),

    // All fields as optional for updates
    ...baseValidations.map(v => v.optional()),
    ...emergencyContactValidations.map(v => v.optional()),
    ...contactValidations,
    ...addressValidations,

    optionalField('dateOfBirth')
        .isISO8601().withMessage('Invalid date (YYYY-MM-DD)')
        .toDate(),

    optionalField('nationality')
        .isLength({ max: 100 }).withMessage('Nationality too long'),

    optionalField('isEnrolled', 'boolean')
        .isBoolean().withMessage('Enrollment status must be true/false'),

    optionalField('profilePicture')
        .isURL().withMessage('Invalid image URL')
        .isLength({ max: 500 }).withMessage('URL too long')
];

// ==================== VALIDATION MIDDLEWARE ====================
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};