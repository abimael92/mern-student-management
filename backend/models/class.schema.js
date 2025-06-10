// 📁 models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    schedule: { type: String, required: true }, // e.g. "Mon-Wed-Fri 10:00-11:00"

    // ======================= 🔹 SYSTEM REFERENCES =======================
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

classSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
classSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Class', classSchema);
