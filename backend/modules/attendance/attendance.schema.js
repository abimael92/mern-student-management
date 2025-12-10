// ===== ./backend/modules/attendance/attendance.schema.js =====
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({

  // ======================= 🔹 CORE IDENTIFICATION =======================
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    required: true
  },

  // ======================= 🔹 ADD THESE ENHANCED FIELDS =======================
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  remarks: { type: String, maxlength: 500 },
  session: {
    type: String,
    enum: ['morning', 'afternoon', 'full_day'],
    default: 'full_day'
  },
  isExcused: { type: Boolean, default: false },
  excuseNote: { type: String },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  // ======================= 🔹 SYSTEM REFERENCES =======================
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },

  // ======================= 🔹 META & TIMESTAMPS =======================
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
attendanceSchema.index({ student: 1, date: 1 });
attendanceSchema.index({ class: 1, date: 1 });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ status: 1 });

// Virtual for formatted date
attendanceSchema.virtual('formattedDate').get(function () {
  return this.date.toISOString().split('T')[0];
});

// Virtual for student name (useful in queries)
attendanceSchema.virtual('studentName', {
  ref: 'Student',
  localField: 'student',
  foreignField: '_id',
  justOne: true,
  options: { select: 'firstName lastName' }
});

const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceSchema);
export default AttendanceRecord;