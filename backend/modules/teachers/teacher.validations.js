import Joi from 'joi';
import { ValidationMessages } from '../../constants/messages.js';
import { AttendanceStatusEnum, QualificationEnum, StatusEnum } from '../../constants/enums.js';  // added StatusEnum import

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
        .required()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID('Teacher number format'),
        }),

    status: Joi.string()
        .valid(...StatusEnum)
        .default('active')
        .required()
        .messages({
            'any.only': `Status must be one of: ${StatusEnum.join(', ')}`,
        }),

    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.email': ValidationMessages.INVALID_EMAIL,
        }),

    phone: Joi.string()
        .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
        .optional()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID('Phone number'),
        }),

    hireDate: Joi.date()
        .optional()
        .messages({
            'date.base': ValidationMessages.INVALID_DATE('Hire date'),
        }),

    qualifications: Joi.array()
        .items(Joi.string().valid(...QualificationEnum))
        .min(1)
        .optional()
        .messages({
            'array.min': ValidationMessages.REQUIRED('At least one qualification'),
            'any.only': `Qualifications must be one of: ${QualificationEnum.join(', ')}`,
        }),

    subjects: Joi.array()
        .min(1)
        .optional()
        .messages({
            'array.min': ValidationMessages.REQUIRED('At least one subject'),
        }),

    department: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .optional()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID_ID,
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

    address: Joi.object({
        street: Joi.string().max(100).allow('', null).optional(),
        city: Joi.string().max(50).allow('', null).optional(),
        state: Joi.string().max(50).allow('', null).optional(),
        zipCode: Joi.string().max(20).allow('', null).optional(),
        country: Joi.string().max(50).allow('', null).optional(),
    }).optional(),

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

    attendanceStatus: Joi.string()
        .valid(...AttendanceStatusEnum)
        .optional()
        .messages({
            'any.only': `Attendance status must be one of: ${AttendanceStatusEnum.join(', ')}`,
        }),
});

export const updateTeacherSchema = createTeacherSchema.fork(
    Object.keys(createTeacherSchema.describe().keys),
    (schema) => schema.optional()
);

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
