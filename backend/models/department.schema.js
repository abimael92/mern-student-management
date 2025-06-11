import mongoose from 'mongoose';

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

const Department = mongoose.model('Department', departmentSchema);
export default Department;
