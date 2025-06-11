import mongoose from 'mongoose';
import { generateStudentNumber } from '../services/studentNumber.service.js'; // Import added

/**
 * STUDENT SCHEMA
 * Core entity representing a student in the system
 * Relationships:
 * - enrolledClasses: Many-to-many with Class
 * - advisor: One-to-one with Teacher
 * - extracurriculars: Many-to-many with Extracurricular
 * - noteIds: One-to-many with StudentNote
 */
const studentSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    studentNumber: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value) => /^ST\d{4}-\d{3}$/.test(value),
            message: props => `${props.value} is not a valid student number!`
        }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String, default: '' },

    // ======================= 🔹 ACADEMIC STATUS =======================
    isActive: { type: Boolean, default: true },
    enrollmentDate: { type: Date, required: true },
    gradeLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    homeroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },

    // ======================= 🔹 CONTACT INFORMATION =======================
    contact: {
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        phone: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        }
    },
    emergencyContacts: [{
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        phone: { type: String, required: true },
        priority: { type: Number, required: true }
    }],

    // ======================= 🔹 PERSONAL DETAILS =======================
    dateOfBirth: { type: Date, required: true },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    nationality: { type: String, required: true },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }],
    advisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    extracurriculars: [{
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExtraCurricular',
            required: true
        },
        role: { type: String, required: true }
    }],
    noteIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'StudentNote',
        required: true
    }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ======================= 🔹 VIRTUALS =======================
studentSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

// ======================= 🔹 PRE-SAVE HOOK =======================
studentSchema.pre('save', async function (next) {
    if (!this.studentNumber) {
        this.studentNumber = await generateStudentNumber(); // Auto-generated
    }
    this.updatedAt = Date.now();
    next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
