import mongoose from 'mongoose';
import { generateTeacherNumber } from './teacher.service.js';

/**
 * TEACHER SCHEMA
 * Core entity representing teaching staff
 * Relationships:
 * - department: Many-to-one with Department
 * - classes: One-to-many with Class
 * - advisorFor: One-to-many with Student
 */
const teacherSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    teacherNumber: {
        type: String,
        unique: true,
        required: true,
        // Note: `default` can't be async; set via pre-validate hook below
        validate: {
            validator: (value) => /^TC\d{4}-\d{3}$/.test(value),
            message: props => `${props.value} is not a valid teacher number!`
        }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    // ======================= 🔹 ACADEMIC STATUS =======================
    status: {
        type: String,
        enum: ['active', 'retired', 'on leave'],
        default: 'active',
        required: true
    },

    // ======================= 🔹 CONTACT INFORMATION =======================
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: { type: String, required: true },

    // ======================= 🔹 PROFESSIONAL DETAILS =======================
    hireDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    qualifications: [{
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: Number, required: true }
    }],

    // ======================= 🔹 SYSTEM REFERENCES =======================
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    }],
    extracurriculars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Extracurricular',
        required: true
    }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ======================= 🔹 VIRTUALS =======================
teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

teacherSchema.virtual('yearsAtSchool').get(function () {
    if (!this.hireDate) return 0;
    const diff = Date.now() - this.hireDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

// ======================= 🔹 PRE-VALIDATION HOOK =======================
// Ensures teacherNumber is generated if not already present
teacherSchema.pre('validate', async function (next) {
    if (!this.teacherNumber) {
        this.teacherNumber = await generateTeacherNumber();
    }
    next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
