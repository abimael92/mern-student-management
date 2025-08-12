// backend/modules/classes/class.validations.js
import Joi from 'joi';
import { ValidationMessages } from '../../constants/messages.js';
import { ClassStatusEnum, DaysOfWeekEnum } from '../../constants/enums.js';

// Common validators
const objectIdValidator = Joi.string().pattern(/^[a-f\d]{24}$/i).messages({
    'string.pattern.base': ValidationMessages.INVALID_ID
});

const timeValidator = Joi.string().pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).messages({
    'string.pattern.base': 'Time must be in HH:MM format (24-hour)'
});

// // Schedule item schema
// const scheduleItemSchema = Joi.object({
//     day: Joi.string().valid(...DaysOfWeekEnum).required().messages({
//         'any.only': `Day must be one of: ${DaysOfWeekEnum.join(', ')}`,
//         'string.empty': ValidationMessages.REQUIRED('Day')
//     }),
//     startTime: timeValidator.required(),
//     endTime: timeValidator.required(),
//     active: Joi.boolean().default(true)
// }).required();

// Enrolled student schema
const enrolledStudentSchema = Joi.object({
    student: objectIdValidator.required(),
    enrollmentDate: Joi.date().default(Date.now),
    status: Joi.string().valid('active', 'waitlisted', 'withdrawn', 'completed').default('active')
});

// Main class schema
export const createClassSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': ValidationMessages.REQUIRED('Class name'),
            'string.min': ValidationMessages.TOO_SHORT('Class name', 2),
            'string.max': ValidationMessages.TOO_LONG('Class name', 100)
        }),

    section: Joi.string()
        .max(10)
        .default('A')
        .messages({
            'string.max': ValidationMessages.TOO_LONG('Section', 10)
        }),

    code: Joi.string()
        .uppercase()
        .max(20)
        .allow('', null)
        .optional()
        .messages({
            'string.max': ValidationMessages.TOO_LONG('Class code', 20)
        }),

    schedule: Joi.any().optional().strip(),  // This completely ignores the field

    academicPeriod: Joi.any().optional().strip(),  // This completely ignores the field

    course: objectIdValidator
        .allow(null)
        .optional(),

    teacher: objectIdValidator
        .allow(null)
        .optional(),

    room: objectIdValidator
        .allow(null)
        .optional(),

    enrolledStudents: Joi.array()
        .items(enrolledStudentSchema)
        .default([])
        .optional(),

    maxCapacity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': ValidationMessages.REQUIRED('Max capacity'),
            'number.min': 'Capacity must be at least 1'
        }),

    waitlistCapacity: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .messages({
            'number.min': 'Waitlist capacity cannot be negative'
        }),

    isActive: Joi.boolean()
        .default(true)
        .optional(),

    isExtracurricular: Joi.boolean()
        .default(false)
        .optional(),

    requiresPrerequisites: Joi.boolean()
        .default(false)
        .optional(),

    attendanceRequired: Joi.boolean()
        .default(true)
        .optional(),

    createdBy: objectIdValidator
        .allow(null)
        .optional(),

    lastModifiedBy: objectIdValidator
        .allow(null)
        .optional()
});

// Update schema (all fields optional)
export const updateClassSchema = createClassSchema.fork(
    Object.keys(createClassSchema.describe().keys),
    (schema) => schema.optional()
);

// Validation middleware
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

export const validateCreateClass = validateRequest(createClassSchema);
export const validateUpdateClass = validateRequest(updateClassSchema);