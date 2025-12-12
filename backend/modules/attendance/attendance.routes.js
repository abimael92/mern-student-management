// ===== ./backend/modules/attendance/attendance.routes.js =====
import express from 'express';
import {
    getAttendanceByDate,
    getStudentAttendanceHistory,
    getClassAttendanceSummary,
    bulkUpdateAttendance,
    markAttendance,
    getAttendanceStats,
    getAttendanceTrends
} from './attendance.controller.js';

const router = express.Router();

// GET /api/attendance - Get attendance by date
router.get('/', getAttendanceByDate);
router.get('/student/:studentId', getStudentAttendanceHistory); // Student's history
router.get('/class/:classId/summary', getClassAttendanceSummary); // Class summary


// POST /api/attendance - Mark attendance
router.post('/', markAttendance);
router.post('/bulk', bulkUpdateAttendance); // Bulk update


// GET /api/attendance/stats - Get attendance statistics
router.get('/stats', getAttendanceStats);

// GET /api/attendance/trends - Get attendance trends
router.get('/trends', getAttendanceTrends);

export default router;