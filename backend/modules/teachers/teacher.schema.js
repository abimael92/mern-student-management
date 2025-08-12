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
        validate: {
            validator: (value) => /^TC\d{4}-\d{3}$/.test(value),
            message: props => `${props.value} is not a valid teacher number!`
        }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String, default: '' },



    // ======================= 🔹 ACADEMIC STATUS =======================
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },


    status: {
        type: String,
        enum: ['available', 'busy', 'on leave', 'inactive'],
        default: 'available',
    },

    // ======================= 🔹 CONTACT INFORMATION =======================
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    phone: { type: String, required: false },

    emergencyContact: {
        name: { type: String, default: '' },
        relation: { type: String, default: '' },
        phone: { type: String, default: '' },
    },

    salary: {
        base: { type: Number, default: 0 },
        paymentSchedule: {
            type: String,
            enum: ['monthly', 'bi-weekly', 'hourly', ''],
            default: '',
        },
    },

    // ======================= 🔹 PROFESSIONAL DETAILS =======================
    qualifications: [{
        degree: { type: String, required: false },
        institution: { type: String, required: false },
        year: { type: Number, required: false }
    }],

    certificates: [{ type: String }],

    yearsOfExperience: { type: Number, default: 0 },

    hireDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    tutoredStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    ],

    // ======================= 🔹 SYSTEM REFERENCES =======================
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: false
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: false
    }],
    extracurriculars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Extracurricular',
        required: false
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

teacherSchema.pre('save', function (next) {
    if (!this.status || this.status === 'inactive') {
        this.status = this.isActive ? 'available' : 'inactive';
    } else if (!this.isActive) {
        this.status = 'inactive';
    }
    next();
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
