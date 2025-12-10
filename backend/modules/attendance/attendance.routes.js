// ===== ./backend/modules/attendance/attendance.routes.js =====
import express from 'express';
import {
    getAttendanceByDate,
    markAttendance,
    getAttendanceStats,
    getAttendanceTrends
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

export default router;