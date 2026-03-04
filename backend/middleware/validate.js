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
  login: Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required()
  }),
  registerUser: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'director', 'teacher', 'student', 'nurse', 'secretary').required(),
    profile: Joi.object().optional()
  })
};

