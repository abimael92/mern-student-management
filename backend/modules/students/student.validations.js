// backend/modules/students/student.validations.js
import Joi from 'joi';
import { ValidationMessages } from '../../constants/messages.js';
import { GenderEnum, GradeEnum } from '../../constants/enums.js';

export const createStudentSchema = Joi.object({
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

    enrollmentDate: Joi.date()
        .allow(null)
        .optional()
        .messages({
            'date.base': ValidationMessages.INVALID_DATE('Enrollment date'),
        }),

    gradeLevel: Joi.string()
        .valid(...GradeEnum, null)
        .allow(null)
        .optional()
        .messages({
            'any.only': `Grade level must be one of: ${GradeEnum.join(', ')} or null`,
        }),

    homeroom: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .allow(null)
        .optional()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID_ID,
        }),

    contact: Joi.object({
        email: Joi.string()
            .email()
            .allow('', null)
            .optional()
            .messages({
                'string.email': ValidationMessages.INVALID_EMAIL,
            }),
        phone: Joi.string()
            .min(5)
            .max(20)
            .allow('', null)
            .optional()
            .messages({
                'string.min': ValidationMessages.TOO_SHORT('Phone', 5),
                'string.max': ValidationMessages.TOO_LONG('Phone', 20),
            }),
        address: Joi.object({
            street: Joi.string().max(200).allow('', null).optional(),
            city: Joi.string().max(100).allow('', null).optional(),
            state: Joi.string().max(100).allow('', null).optional(),
            postalCode: Joi.string().max(20).allow('', null).optional(),
            country: Joi.string().max(100).allow('', null).optional(),
        }).allow(null).optional(),
    }).allow(null).optional(),

    dateOfBirth: Joi.date()
        .allow(null)
        .optional()
        .messages({
            'date.base': ValidationMessages.INVALID_DATE('Date of birth'),
        }),

    gender: Joi.string()
        .valid(...GenderEnum, null)
        .allow(null)
        .optional()
        .messages({
            'any.only': `Gender must be one of: ${GenderEnum.join(', ')} or null`,
        }),

    nationality: Joi.string()
        .max(100)
        .allow('', null)
        .optional()
        .messages({
            'string.max': ValidationMessages.TOO_LONG('Nationality', 100),
        }),

    advisor: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .allow(null)
        .optional()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID_ID,
        }),

    profilePicture: Joi.string()
        .uri()
        .max(500)
        .allow('', null)
        .optional()
        .messages({
            'string.uri': 'Profile picture must be a valid URL',
        }),

    isEnrolled: Joi.boolean().allow(null).optional(),

    medicalInfo: Joi.object({
        allergies: Joi.string().allow('', null).optional(),
        nurseComments: Joi.string().allow('', null).optional()
    }).allow(null).optional(),

    alerts: Joi.object({
        behavior: Joi.string().allow('', null).optional(),
        academic: Joi.string().allow('', null).optional(),
        flag: Joi.string().valid('none', 'warning', 'success', null).optional()
    }).allow(null).optional(),

    enrolledClasses: Joi.array()
        .items(Joi.string().pattern(/^[a-f\d]{24}$/i))
        .allow(null)
        .optional(),

    emergencyContacts: Joi.array()
        .items(Joi.object({
            name: Joi.string().min(2).max(100).allow('', null).optional(),
            relationship: Joi.string().min(2).max(50).allow('', null).optional(),
            phone: Joi.string().min(5).max(20).allow('', null).optional(),
            priority: Joi.number().integer().allow(null).optional(),
        }))
        .allow(null)
        .optional(),

    extracurriculars: Joi.array()
        .items(Joi.object({
            group: Joi.string().pattern(/^[a-f\d]{24}$/i).allow(null).optional(),
            role: Joi.string().min(1).allow('', null).optional(),
        }))
        .allow(null)
        .optional(),

    noteIds: Joi.array()
        .items(Joi.string().pattern(/^[a-f\d]{24}$/i))
        .allow(null)
        .optional()
});

export const updateStudentSchema = createStudentSchema.fork(
    Object.keys(createStudentSchema.describe().keys),
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

export const validateCreateStudent = validateRequest(createStudentSchema);
export const validateUpdateStudent = validateRequest(updateStudentSchema);