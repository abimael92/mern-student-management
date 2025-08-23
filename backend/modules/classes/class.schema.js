import mongoose from 'mongoose';


const classSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    name: {
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: String,
        default: 'A'
    },
    code: {
        type: String,
        required: false, // Changed from true
        uppercase: true
    },

    // ======================= 🔹 TEMPORAL STRUCTURE =======================
    schedule: [{
        day: String,
        startTime: String,
        endTime: String,
        active: { type: Boolean, default: true }
    }],
    academicPeriod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicPeriod',
        required: false,
        set: v => !v ? undefined : v // THE ONLY LINE YOU NEED
    },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        enrollmentDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: 'active'
        },
        _id: false
    }],

    // ======================= 🔹 CAPACITY MANAGEMENT =======================
    maxCapacity: Number,
    waitlistCapacity: {
        type: Number,
        default: 0
    },

    // ======================= 🔹 SYSTEM FLAGS =======================
    isActive: {
        type: Boolean,
        default: true
    },
    isExtracurricular: {
        type: Boolean,
        default: false
    },
    requiresPrerequisites: {
        type: Boolean,
        default: false
    },
    attendanceRequired: {
        type: Boolean,
        default: true
    },

    // ======================= 🔹 AUDIT TRAIL =======================
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Keep virtual properties if needed
classSchema.virtual('currentEnrollment').get(function () {
    if (!this.students) return 0;
    return this.students.filter(s => s.status === 'active').length;
});


// Keep indexes if needed
classSchema.index({ course: 1 });
classSchema.index({ teacher: 1 });
classSchema.index({ room: 1 });

const Class = mongoose.model('Class', classSchema);
export default Class;