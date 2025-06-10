const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    name: { type: String, required: true, unique: true },

    // ======================= 🔹 CONTACT & DESCRIPTION =======================
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    description: { type: String },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model('Department', departmentSchema);
