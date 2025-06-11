import mongoose from 'mongoose';
import { generateCourseCode } from '../services/codeGenerator.service.js';

/**
 * COURSE SCHEMA
 * Represents academic courses offered
 * Relationships:
 * - subject: Many-to-one with Subject
 * - semester: Many-to-one with Semester
 * - classes: One-to-many with Class
 */
const courseSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    courseCode: {
        type: String,
        unique: true,
        required: true,
        default: async function () {
            return await generateCourseCode(this.name);
        }
    },
    name: { type: String, required: true },

    // ======================= 🔹 ACADEMIC DETAILS =======================
    credits: { type: Number, required: true },
    description: { type: String, required: true },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// ======================= 🔹 VIRTUALS =======================
courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Course = mongoose.model('Course', courseSchema);
export default Course;