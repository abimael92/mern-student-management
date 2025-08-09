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

    profilePicture: Joi.string()
        .uri()
        .max(500)
        .optional()
        .allow('', null)
        .messages({
            'string.uri': 'Profile picture must be a valid URL',
        }),

    isActive: Joi.boolean().optional(),

    enrollmentDate: Joi.date()
        .required()
        .messages({
            'date.base': ValidationMessages.INVALID_DATE('Enrollment date'),
            'any.required': ValidationMessages.REQUIRED('Enrollment date'),
        }),

    gradeLevel: Joi.string()
        .valid(...GradeEnum)
        .required()
        .messages({
            'any.only': `Grade level must be one of: ${GradeEnum.join(', ')}`,
            'any.required': ValidationMessages.REQUIRED('Grade level'),
        }),

    homeroom: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .required()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID_ID,
            'any.required': ValidationMessages.REQUIRED('Homeroom'),
        }),

    contact: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': ValidationMessages.INVALID_EMAIL,
                'any.required': ValidationMessages.REQUIRED('Email'),
            }),
        phone: Joi.string()
            .min(5)
            .max(20)
            .required()
            .messages({
                'string.min': ValidationMessages.TOO_SHORT('Phone', 5),
                'string.max': ValidationMessages.TOO_LONG('Phone', 20),
                'any.required': ValidationMessages.REQUIRED('Phone'),
            }),
        address: Joi.object({
            street: Joi.string().max(200).optional().allow(''),
            city: Joi.string().max(100).optional().allow(''),
            state: Joi.string().max(100).optional().allow(''),
            postalCode: Joi.string().max(20).optional().allow(''),
            country: Joi.string().max(100).optional().allow(''),
        }).optional(),
    }).required(),

    emergencyContacts: Joi.array()
        .items(
            Joi.object({
                name: Joi.string()
                    .min(2)
                    .max(100)
                    .required()
                    .messages({
                        'string.empty': ValidationMessages.REQUIRED('Emergency contact name'),
                    }),
                relationship: Joi.string()
                    .min(2)
                    .max(50)
                    .required()
                    .messages({
                        'string.empty': ValidationMessages.REQUIRED('Emergency contact relationship'),
                    }),
                phone: Joi.string()
                    .min(5)
                    .max(20)
                    .required()
                    .messages({
                        'string.empty': ValidationMessages.REQUIRED('Emergency contact phone'),
                    }),
                priority: Joi.number()
                    .integer()
                    .required()
                    .messages({
                        'number.base': 'Priority must be a number',
                        'any.required': ValidationMessages.REQUIRED('Priority'),
                    }),
            })
        )
        .min(1)
        .optional(),

    dateOfBirth: Joi.date()
        .required()
        .messages({
            'date.base': ValidationMessages.INVALID_DATE('Date of birth'),
            'any.required': ValidationMessages.REQUIRED('Date of birth'),
        }),

    gender: Joi.string()
        .valid(...GenderEnum)
        .required()
        .messages({
            'any.only': `Gender must be one of: ${GenderEnum.join(', ')}`,
            'any.required': ValidationMessages.REQUIRED('Gender'),
        }),

    nationality: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.max': ValidationMessages.TOO_LONG('Nationality', 100),
            'any.required': ValidationMessages.REQUIRED('Nationality'),
        }),

    enrolledClasses: Joi.array()
        .items(
            Joi.string()
                .pattern(/^[a-f\d]{24}$/i)
                .messages({
                    'string.pattern.base': ValidationMessages.INVALID_ID,
                })
        )
        .optional(),

    advisor: Joi.string()
        .pattern(/^[a-f\d]{24}$/i)
        .required()
        .messages({
            'string.pattern.base': ValidationMessages.INVALID_ID,
            'any.required': ValidationMessages.REQUIRED('Advisor'),
        }),

    extracurriculars: Joi.array()
        .items(
            Joi.object({
                group: Joi.string()
                    .pattern(/^[a-f\d]{24}$/i)
                    .required()
                    .messages({
                        'string.pattern.base': ValidationMessages.INVALID_ID,
                        'any.required': ValidationMessages.REQUIRED('Extracurricular group'),
                    }),
                role: Joi.string()
                    .min(1)
                    .required()
                    .messages({
                        'string.empty': ValidationMessages.REQUIRED('Extracurricular role'),
                    }),
            })
        )
        .optional(),

    noteIds: Joi.array()
        .items(
            Joi.string()
                .pattern(/^[a-f\d]{24}$/i)
                .optional()
        )
        .optional(),
});

// For updates: make all fields optional but validate format if provided
export const updateStudentSchema = createStudentSchema.fork(
    Object.keys(createStudentSchema.describe().keys),
    (schema) => schema.optional()
);

// Generic middleware factory to validate any Joi schema
export const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'fail',
            errors: error.details.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        });
    }
    next();
};

// Specific middleware for your student routes
export const validateCreateStudent = validateRequest(createStudentSchema);
export const validateUpdateStudent = validateRequest(updateStudentSchema);
