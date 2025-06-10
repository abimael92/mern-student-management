// 📁 models/AttendanceRecord.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  // ======================= 🔹 CORE IDENTIFICATION =======================
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late', 'excused'], required: true },

  // ======================= 🔹 SYSTEM REFERENCES =======================
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },

  // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

attendanceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
attendanceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AttendanceRecord', attendanceSchema);
