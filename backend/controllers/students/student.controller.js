import Student from '../../models/student.schema';
import ApiFeatures from '../../utils/apiFeatures';
import AppError from '../../utils/appError';
import responseHandler from '../../utils/responseHandler';
import { generateStudentNumber } from '../../services/studentNumber.service';
import logger from '../../config/logger';

export const createStudent = async (req, res, next) => {
    try {
        // Ensure required fields are present
        if (!req.body.firstName || !req.body.lastName) {
            throw new AppError('First name and last name are required', 400);
        }

        const studentData = {
            ...req.body,
            studentNumber: await generateStudentNumber(),
            // Ensure defaults are maintained for optional fields
            contactInfo: {
                phone: req.body.contactInfo?.phone || 'N/A',
                email: req.body.contactInfo?.email || 'N/A',
            },
            emergencyContact: {
                name: req.body.emergencyContact?.name || 'N/A',
                relation: req.body.emergencyContact?.relation || 'N/A',
                phone: req.body.emergencyContact?.phone || 'N/A'
            }
        };

        const student = await Student.create(studentData);

        logger.info(`Student created: ${student.studentNumber}`);
        responseHandler(res, 201, {
            ...student.toObject(),
            fullName: student.fullName // Include virtual field
        });
    } catch (error) {
        logger.error(`Student creation failed: ${error.message}`);
        next(error);
    }
};

export const getAllStudents = async (req, res, next) => {
    try {
        const features = new ApiFeatures(Student.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const students = await features.query;

        // Map students to include virtual fields
        const studentsWithVirtuals = students.map(student => ({
            ...student.toObject(),
            fullName: student.fullName
        }));

        responseHandler(res, 200, {
            results: students.length,
            students: studentsWithVirtuals
        });
    } catch (error) {
        logger.error(`Get all students failed: ${error.message}`);
        next(error);
    }
};

export const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            logger.warn(`Student not found: ${req.params.id}`);
            return next(new AppError('No student found with that ID', 404));
        }

        responseHandler(res, 200, {
            ...student.toObject(),
            fullName: student.fullName
        });
    } catch (error) {
        logger.error(`Get student failed: ${error.message}`);
        next(error);
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        // Prevent updating studentNumber
        if (req.body.studentNumber) {
            delete req.body.studentNumber;
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!student) {
            logger.warn(`Student update failed - not found: ${req.params.id}`);
            return next(new AppError('No student found with that ID', 404));
        }

        logger.info(`Student updated: ${student.studentNumber}`);
        responseHandler(res, 200, {
            ...student.toObject(),
            fullName: student.fullName
        });
    } catch (error) {
        logger.error(`Student update failed: ${error.message}`);
        next(error);
    }
};

export const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            logger.warn(`Student delete failed - not found: ${req.params.id}`);
            return next(new AppError('No student found with that ID', 404));
        }

        logger.info(`Student deleted: ${student.studentNumber}`);
        responseHandler(res, 204, null);
    } catch (error) {
        logger.error(`Student delete failed: ${error.message}`);
        next(error);
    }
};

export const toggleEnrollmentStatus = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            logger.warn(`Enrollment toggle failed - student not found: ${req.params.id}`);
            return next(new AppError('No student found with that ID', 404));
        }

        student.isEnrolled = !student.isEnrolled;
        await student.save();

        logger.info(`Enrollment status toggled for: ${student.studentNumber} to ${student.isEnrolled}`);
        responseHandler(res, 200, {
            status: 'success',
            isEnrolled: student.isEnrolled
        });
    } catch (error) {
        logger.error(`Enrollment toggle failed: ${error.message}`);
        next(error);
    }
};