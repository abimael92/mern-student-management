import express from 'express';
import {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    toggleEnrollmentStatus,
} from '../controllers/students/student.controller.js';
import {
    createStudentValidations,
    updateStudentValidations,
} from '../controllers/students/student.validations.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // New auth middleware
import roleMiddleware from '../middlewares/role.middleware.js'; // New role middleware
import requestLogger from '../middlewares/requestLogger.middleware.js'; // New logging middleware
import rateLimit from 'express-rate-limit'; // For rate limiting
import sanitizeMiddleware from '../middlewares/sanitize.middleware.js'; // New sanitization

// Rate limiting configuration
const createStudentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many student creation attempts, please try again later'
});

const router = express.Router();

// Apply request logging to all student routes
router.use(requestLogger('student'));

// Apply sanitization to all input
router.use(sanitizeMiddleware);

// Public routes (read-only)
router.route('/')
    .get(getAllStudents);

router.route('/:id')
    .get(getStudent);

// Protected routes (require authentication)
router.use(authMiddleware);

// Role-protected routes
router.route('/')
    .post(
        roleMiddleware(['admin', 'registrar']), // Only admin and registrar can create
        createStudentLimiter, // Rate limiting
        createStudentValidations,
        validationMiddleware,
        createStudent
    );

router.route('/:id')
    .patch(
        roleMiddleware(['admin', 'registrar', 'teacher']), // Teachers can update limited fields
        updateStudentValidations,
        validationMiddleware,
        updateStudent
    )
    .delete(
        roleMiddleware(['admin']), // Only admin can delete
        deleteStudent
    );

router.patch('/:id/toggle-status',
    roleMiddleware(['admin', 'registrar']),
    toggleEnrollmentStatus
);

export default router;