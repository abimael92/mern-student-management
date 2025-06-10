// 📁 models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    name: { type: String, required: true },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },

    // ======================= 🔹 PERSONAL DETAILS =======================
    description: { type: String },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
