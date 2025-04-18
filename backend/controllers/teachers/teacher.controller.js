import Teacher from '../models/Teacher';
import ApiFeatures from '../utils/apiFeatures';
import AppError from '../utils/appError';
import responseHandler from '../utils/responseHandler';
import logger from '../config/logger';

export const createTeacher = async (req, res, next) => {
    try {
        // Calculate years of experience if not provided
        if (!req.body.yearsOfExperience && req.body.joiningDate) {
            const joiningYear = new Date(req.body.joiningDate).getFullYear();
            req.body.yearsOfExperience = new Date().getFullYear() - joiningYear;
        }

        const teacher = await Teacher.create(req.body);

        logger.info(`Teacher created: ${teacher._id}`);
        responseHandler(res, 201, teacher);
    } catch (error) {
        logger.error(`Teacher creation failed: ${error.message}`);
        next(error);
    }
};

export const getAllTeachers = async (req, res, next) => {
    try {
        const features = new ApiFeatures(Teacher.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate('classesAssigned.class', 'name level');

        const teachers = await features.query;

        responseHandler(res, 200, {
            status: 'success',
            results: teachers.length,
            data: { teachers }
        });
    } catch (error) {
        logger.error(`Get all teachers failed: ${error.message}`);
        next(error);
    }
};

export const getTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate('classesAssigned.class', 'name level')
            .populate('performanceReviews.reviewer', 'firstName lastName');

        if (!teacher) {
            logger.warn(`Teacher not found: ${req.params.id}`);
            return next(new AppError('No teacher found with that ID', 404));
        }

        responseHandler(res, 200, {
            status: 'success',
            data: { teacher }
        });
    } catch (error) {
        logger.error(`Get teacher failed: ${error.message}`);
        next(error);
    }
};

export const updateTeacher = async (req, res, next) => {
    try {
        // Prevent updating protected fields
        const protectedFields = ['email', 'joiningDate', 'createdAt', 'updatedAt'];
        protectedFields.forEach(field => {
            if (req.body[field]) {
                delete req.body[field];
            }
        });

        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('classesAssigned.class', 'name level');

        if (!teacher) {
            logger.warn(`Teacher update failed - not found: ${req.params.id}`);
            return next(new AppError('No teacher found with that ID', 404));
        }

        logger.info(`Teacher updated: ${teacher._id}`);
        responseHandler(res, 200, {
            status: 'success',
            data: { teacher }
        });
    } catch (error) {
        logger.error(`Teacher update failed: ${error.message}`);
        next(error);
    }
};

export const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            logger.warn(`Teacher delete failed - not found: ${req.params.id}`);
            return next(new AppError('No teacher found with that ID', 404));
        }

        logger.info(`Teacher deleted: ${teacher._id}`);
        responseHandler(res, 204, null);
    } catch (error) {
        logger.error(`Teacher delete failed: ${error.message}`);
        next(error);
    }
};

export const toggleTeacherStatus = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            logger.warn(`Status toggle failed - teacher not found: ${req.params.id}`);
            return next(new AppError('No teacher found with that ID', 404));
        }

        teacher.isActive = !teacher.isActive;
        await teacher.save();

        logger.info(`Teacher status toggled: ${teacher._id} to ${teacher.isActive}`);
        responseHandler(res, 200, {
            status: 'success',
            data: { isActive: teacher.isActive }
        });
    } catch (error) {
        logger.error(`Teacher status toggle failed: ${error.message}`);
        next(error);
    }
};

export const addTeacherVacation = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { vacations: req.body } },
            { new: true, runValidators: true }
        );

        if (!teacher) {
            return next(new AppError('No teacher found with that ID', 404));
        }

        responseHandler(res, 200, {
            status: 'success',
            data: { vacations: teacher.vacations }
        });
    } catch (error) {
        next(error);
    }
};

export const addPerformanceReview = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { performanceReviews: req.body } },
            { new: true, runValidators: true }
        );

        if (!teacher) {
            return next(new AppError('No teacher found with that ID', 404));
        }

        responseHandler(res, 200, {
            status: 'success',
            data: { performanceReviews: teacher.performanceReviews }
        });
    } catch (error) {
        next(error);
    }
};

export const recordAttendance = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { attendance: req.body } },
            { new: true, runValidators: true }
        );

        if (!teacher) {
            return next(new AppError('No teacher found with that ID', 404));
        }

        responseHandler(res, 200, {
            status: 'success',
            data: { attendance: teacher.attendance }
        });
    } catch (error) {
        next(error);
    }
};