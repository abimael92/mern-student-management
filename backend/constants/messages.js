export const ValidationMessages = {
    REQUIRED: (field) => `${field} is required.`,
    INVALID_EMAIL: 'Email must be valid.',
    INVALID_DATE: (field) => `${field} must be a valid date.`,
    INVALID_ID: 'Invalid ID format.',
    TOO_SHORT: (field, min) => `${field} must be at least ${min} characters.`,
    TOO_LONG: (field, max) => `${field} must be at most ${max} characters.`,
};
