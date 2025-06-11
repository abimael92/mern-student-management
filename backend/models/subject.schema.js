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
        required: true,
        default: async function () {
            return await generateSubjectCode(this.name);
        }
    },
    name: { type: String, required: true },

    // ======================= 🔹 ACADEMIC DETAILS =======================
    description: { type: String, required: true },
    creditValue: { type: Number, required: true },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// ======================= 🔹 VIRTUALS =======================
subjectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;