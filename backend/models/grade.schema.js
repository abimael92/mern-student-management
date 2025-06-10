// 📁 models/GradeRecord.js
const mongoose = require('mongoose');

const gradeRecordSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    grade: { type: String, required: true },
    dateRecorded: { type: Date, default: Date.now },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

gradeRecordSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
gradeRecordSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('GradeRecord', gradeRecordSchema);
