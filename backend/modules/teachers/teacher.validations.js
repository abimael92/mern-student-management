import Joi from 'joi';
import { ValidationMessages } from '../../constants/messages.js';

// Enums for fields
const SubjectEnum = ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages'];
const QualificationEnum = ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma'];
const StatusEnum = ['active', 'retired', 'on leave'];

export const createTeacherSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': ValidationMessages.REQUIRED('First name'),
            'string.min': ValidationMessages.TOO_SHORT('First name', 2),
            'string.max': ValidationMessages.TOO_LONG('First name', 50),
        }),

    lastName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': ValidationMessages.REQUIRED('Last name'),
            'string.min': ValidationMessages.TOO_SHORT('Last name', 2),
            'string.max': ValidationMessages.TOO_LONG('Last name', 50),
        }),

    teacherNumber: Joi.string()
        .pattern(/^TC\d{4}-\d{3}$/)
        .optional()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID('Teacher number format'),
        }),

    status: Joi.string()
        .valid(...StatusEnum)
        .default('active')
        .messages({
            'any.only': `Status must be one of: ${StatusEnum.join(', ')}`,
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': ValidationMessages.INVALID_EMAIL,
            'string.empty': ValidationMessages.REQUIRED('Email'),
        }),

    phone: Joi.string()
        .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
        .required()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID('Phone number'),
            'string.empty': ValidationMessages.REQUIRED('Phone'),
        }),

    hireDate: Joi.date()
        .optional()
        .messages({
            'date.base': ValidationMessages.INVALID_DATE('Hire date'),
        }),

    qualifications: Joi.array()
        .items(Joi.string().valid(...QualificationEnum))
        .min(1)
        .required()
        .messages({
            'array.min': ValidationMessages.REQUIRED('At least one qualification'),
            'any.only': `Qualifications must be one of: ${QualificationEnum.join(', ')}`,
        }),

    subjects: Joi.array()
        .items(Joi.string().valid(...SubjectEnum))
        .min(1)
        .required()
        .messages({
            'array.min': ValidationMessages.REQUIRED('At least one subject'),
            'any.only': `Subjects must be one of: ${SubjectEnum.join(', ')}`,
        }),

    department: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .required()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID_ID,
            'string.empty': ValidationMessages.REQUIRED('Department'),
        }),

    classes: Joi.array()
        .items(Joi.string().pattern(/^[a-f\d]{24}$/i))
        .optional(),

    notes: Joi.array()
        .items(Joi.string().pattern(/^[a-f\d]{24}$/i))
        .optional(),

    extracurriculars: Joi.array()
        .items(Joi.string().pattern(/^[a-f\d]{24}$/i))
        .optional(),

    // Nested optional address object
    address: Joi.object({
        street: Joi.string().max(100).allow('', null).optional(),
        city: Joi.string().max(50).allow('', null).optional(),
        state: Joi.string().max(50).allow('', null).optional(),
        zipCode: Joi.string().max(20).allow('', null).optional(),
        country: Joi.string().max(50).allow('', null).optional(),
    }).optional(),

    // Nested optional emergencyContact object
    emergencyContact: Joi.object({
        name: Joi.string().max(100).allow('', null).optional(),
        relation: Joi.string().max(50).allow('', null).optional(),
        phone: Joi.string()
            .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
            .allow('', null)
            .optional()
            .messages({ 'string.pattern.base': 'Invalid emergency contact phone number' }),
    }).optional(),

    profilePicture: Joi.string()
        .uri()
        .max(500)
        .optional()
        .messages({
            'string.uri': ValidationMessages.INVALID('Profile picture URL'),
        }),
});

export const updateTeacherSchema = createTeacherSchema.fork(
    Object.keys(createTeacherSchema.describe().keys),
    (schema) => schema.optional()
);

// Generic Joi validation middleware for Express
export const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'fail',
            errors: error.details.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        });
    }
    next();
};

export const validateCreateTeacher = validateRequest(createTeacherSchema);
export const validateUpdateTeacher = validateRequest(updateTeacherSchema);
