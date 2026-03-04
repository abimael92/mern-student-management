import Joi from 'joi';

export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const data = req[property];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({ message: 'Validation failed', errors: details });
    }

    req[property] = value;
    next();
  };
};

export const JoiSchemas = {
  // Auth schemas
  login: Joi.object({
    usernameOrEmail: Joi.string().required().messages({
      'string.empty': 'Username or email is required'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required'
    })
  }),

  registerUser: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.alphanum': 'Username must contain only letters and numbers',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username cannot exceed 30 characters',
      'string.empty': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required'
    }),
    role: Joi.string().valid('admin', 'director', 'teacher', 'student', 'nurse', 'secretary').required().messages({
      'any.only': 'Role must be one of: admin, director, teacher, student, nurse, secretary',
      'string.empty': 'Role is required'
    }),
    profile: Joi.object({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      phone: Joi.string().optional(),
      address: Joi.string().optional()
    }).optional()
  }),

  // Refresh token schema (validates cookies)
  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      'string.empty': 'Refresh token is required'
    })
  }),

  // Password change schema
  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'string.empty': 'Current password is required'
    }),
    newPassword: Joi.string().min(8).required().messages({
      'string.min': 'New password must be at least 8 characters',
      'string.empty': 'New password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password'
    })
  }),

  // Forgot password schema
  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'Email is required'
    })
  }),

  // Reset password schema
  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      'string.empty': 'Reset token is required'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password'
    })
  }),

  // User update schema
  updateUser: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    profile: Joi.object({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      phone: Joi.string().optional(),
      address: Joi.string().optional()
    }).optional(),
    isActive: Joi.boolean().optional()
  }),

  // Student schemas
  createStudent: Joi.object({
    firstName: Joi.string().required().messages({
      'string.empty': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
      'string.empty': 'Last name is required'
    }),
    dateOfBirth: Joi.date().iso().required().messages({
      'date.base': 'Please provide a valid date of birth'
    }),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    grade: Joi.string().required(),
    section: Joi.string().required(),
    admissionNumber: Joi.string().required(),
    contact: Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().email().optional(),
      address: Joi.string().required()
    }).required(),
    emergencyContact: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      relationship: Joi.string().required()
    }).required()
  }),

  // Attendance schemas
  markAttendance: Joi.object({
    date: Joi.date().iso().default(() => new Date()),
    class: Joi.string().required(),
    records: Joi.array().items(
      Joi.object({
        student: Joi.string().required(),
        status: Joi.string().valid('present', 'absent', 'late', 'excused').required(),
        notes: Joi.string().optional()
      })
    ).min(1).required()
  }),

  // Query parameter schemas
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().optional(),
    order: Joi.string().valid('asc', 'desc').default('asc')
  }),

  dateRange: Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required().messages({
      'date.min': 'End date must be after start date'
    })
  })
};

// Helper function to validate query parameters
export const validateQuery = (schema) => validate(schema, 'query');

// Helper function to validate params
export const validateParams = (schema) => validate(schema, 'params');

// Helper function to validate cookies (useful for refresh token)
export const validateCookies = (schema) => validate(schema, 'cookies');