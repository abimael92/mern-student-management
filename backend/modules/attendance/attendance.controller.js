// ===== ./backend/modules/attendance/attendance.controller.js =====
import AttendanceRecord from './attendance.schema.js';
import Student from '../students/student.schema.js';
import Class from '../classes/class.schema.js';
import mongoose from 'mongoose';

// Get attendance by date
export const getAttendanceByDate = async (req, res) => {
    try {
        console.log('📅 Fetching attendance for date:', req.query.date);
        console.log('📊 Query params:', req.query);
        const { date, classId } = req.query;

        let query = {};

        if (date) {
            console.log('📅 Date provided:', date);
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        }

        if (classId && mongoose.Types.ObjectId.isValid(classId)) {
            query.class = new mongoose.Types.ObjectId(classId);
        }

        console.log('🔍 MongoDB query:', JSON.stringify(query));
        const attendance = await AttendanceRecord.find(query)
            .populate('student', 'firstName lastName studentNumber profilePicture gradeLevel gradeAlias')
            .populate('class', 'name section code')
            .sort({ date: -1 });

        console.log('✅ Found', attendance.length, 'attendance records');
        res.status(200).json(attendance);
    } catch (error) {
        console.error('❌ Detailed error fetching attendance:');
        console.error('   Message:', error.message);
        console.error('   Stack:', error.stack);
        res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
};

// Get attendance statistics
export const getAttendanceStats = async (req, res) => {
    try {
        const { startDate, endDate, classId } = req.query;

        let matchStage = {};

        if (startDate && endDate) {
            matchStage.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        } else {
            // Default to last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            matchStage.date = { $gte: thirtyDaysAgo };
        }

        if (classId && mongoose.Types.ObjectId.isValid(classId)) {
            matchStage.class = new mongoose.Types.ObjectId(classId);
        }

        const stats = await AttendanceRecord.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$count' },
                    statusCounts: {
                        $push: {
                            status: '$_id',
                            count: '$count'
                        }
                    }
                }
            },
            {
                $addFields: {
                    present: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: '$statusCounts',
                                            as: 'item',
                                            cond: { $eq: ['$$item.status', 'present'] }
                                        }
                                    },
                                    0
                                ]
                            },
                            { status: 'present', count: 0 }
                        ]
                    },
                    absent: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: '$statusCounts',
                                            as: 'item',
                                            cond: { $eq: ['$$item.status', 'absent'] }
                                        }
                                    },
                                    0
                                ]
                            },
                            { status: 'absent', count: 0 }
                        ]
                    },
                    late: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: '$statusCounts',
                                            as: 'item',
                                            cond: { $eq: ['$$item.status', 'late'] }
                                        }
                                    },
                                    0
                                ]
                            },
                            { status: 'late', count: 0 }
                        ]
                    }
                }
            },
            {
                $project: {
                    total: 1,
                    present: '$present.count',
                    absent: '$absent.count',
                    late: '$late.count',
                    attendanceRate: {
                        $cond: [
                            { $eq: ['$total', 0] },
                            0,
                            { $multiply: [{ $divide: ['$present.count', '$total'] }, 100] }
                        ]
                    }
                }
            }
        ]);

        const result = stats[0] || {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            attendanceRate: 0
        };

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching attendance stats:', error);
        res.status(500).json({ error: 'Failed to fetch attendance statistics' });
    }
};

// Mark attendance for multiple students
export const markAttendance = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { date, records, classId } = req.body;

        if (!date || !records || !classId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        // Delete existing attendance for this date and class
        await AttendanceRecord.deleteMany({
            date: {
                $gte: new Date(attendanceDate.setHours(0, 0, 0, 0)),
                $lte: new Date(attendanceDate.setHours(23, 59, 59, 999))
            },
            class: classId
        }, { session });

        // Create new attendance records
        const attendanceRecords = records.map(record => ({
            student: record.studentId,
            class: classId,
            date: attendanceDate,
            status: record.status,
            remarks: record.remarks || '',
            session: 'full_day'
        }));

        const savedAttendance = await AttendanceRecord.insertMany(attendanceRecords, { session });

        await session.commitTransaction();

        res.status(201).json({
            message: 'Attendance marked successfully',
            records: savedAttendance.length
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Failed to mark attendance' });
    } finally {
        session.endSession();
    }
};

// Get attendance trends
export const getAttendanceTrends = async (req, res) => {
    try {
        const { classId, days = 30 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        let matchStage = {
            date: { $gte: startDate }
        };

        if (classId && mongoose.Types.ObjectId.isValid(classId)) {
            matchStage.class = new mongoose.Types.ObjectId(classId);
        }

        const trends = await AttendanceRecord.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        status: "$status"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    total: { $sum: "$count" },
                    present: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "present"] }, "$count", 0]
                        }
                    }
                }
            },
            {
                $addFields: {
                    attendanceRate: {
                        $cond: [
                            { $eq: ["$total", 0] },
                            0,
                            { $multiply: [{ $divide: ["$present", "$total"] }, 100] }
                        ]
                    }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json(trends);
    } catch (error) {
        console.error('Error fetching attendance trends:', error);
        res.status(500).json({ error: 'Failed to fetch attendance trends' });
    }
};