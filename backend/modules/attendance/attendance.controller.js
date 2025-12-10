// ===== ./backend/modules/attendance/attendance.routes.js =====
import express from 'express';
import {
    getAttendanceByDate,
    markAttendance,
    getAttendanceStats,
    getAttendanceTrends,
    getStudentAttendanceHistory
} from './attendance.controller.js';

const router = express.Router();

// GET /api/attendance - Get attendance by date
router.get('/', getAttendanceByDate);

// POST /api/attendance - Mark attendance
router.post('/', markAttendance);

// GET /api/attendance/stats - Get attendance statistics
router.get('/stats', getAttendanceStats);

// GET /api/attendance/trends - Get attendance trends
router.get('/trends', getAttendanceTrends);

// GET /api/attendance/student-history - Get student attendance history
router.get('/student-history', getStudentAttendanceHistory);

export default router;