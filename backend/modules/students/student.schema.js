import mongoose from 'mongoose';
import { generateStudentNumber } from './student.services.js';
import { GradeEnum } from '../../constants/enums.js';

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
    isEnrolled: { type: Boolean, default: true },
    enrollmentDate: { type: Date, },
    gradeLevel: {
        type: String,
        enum: [...GradeEnum],
    },
    homeroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
    },

    // ======================= 🔹 CONTACT INFORMATION =======================
    contact: {
        email: {
            type: String,
            lowercase: true
        },
        phone: { type: String },
        address: {
            street: { type: String, },
            city: { type: String, },
            state: { type: String, },
            postalCode: { type: String, },
            country: { type: String, }
        }
    },
    emergencyContacts: [{
        name: { type: String, },
        relationship: { type: String, },
        phone: { type: String, },
        priority: { type: Number, }
    }],

    // ======================= 🔹 PERSONAL DETAILS =======================
    dateOfBirth: { type: Date, },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    nationality: { type: String, },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',

    }],
    advisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',

    },
    extracurriculars: [{
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExtraCurricular',

        },
        role: { type: String, }
    }],
    noteIds: [{
        type: mongoose.Types.ObjectId,
        ref: 'StudentNote',

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
