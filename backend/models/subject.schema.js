import mongoose from 'mongoose';
import { generateSubjectCode } from '../services/codeGenerator.service.js';

/**
 * SUBJECT SCHEMA
 * Represents academic subjects
 * Relationships:
 * - courses: One-to-many with Course
 * - department: Many-to-one with Department
 */
const subjectSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    subjectCode: {
        type: String,
        unique: true,
        sparse: true,
        required: true,
    },
    name: { type: String, required: true },

    // ======================= 🔹 ACADEMIC DETAILS =======================
    description: { type: String, required: true },
    creditValue: { type: Number, required: true },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: false,
        default: null
    }

    // ======================= 🔹 META & TIMESTAMPS =======================
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// ======================= 🔹 VIRTUALS =======================
subjectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

subjectSchema.pre('save', async function (next) {
    if (this.isNew && !this.subjectCode.startsWith('TEMP_CODE')) {
        try {
            this.subjectCode = await generateSubjectCode(this.name);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;