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
        unique: true,
        required: true,
        uppercase: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[A-Z]{3}\d{3}-\d{2}[A-Z]?$/.test(v); // e.g. "MAT101-01A"
        //     },
        //     message: 'Class code must follow format: SUB123-45X'
        // }
    },

    // ======================= 🔹 TEMPORAL STRUCTURE =======================
    schedule: {
        type: [{
            day: {
                type: String,
                enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            startTime: {
                type: String,
                match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // HH:MM 24h format
            },
            endTime: {
                type: String,
                match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
                validate: {
                    validator: function (v) {
                        return v > this.startTime;
                    },
                    message: 'End time must be after start time'
                }
            },
            active: { type: Boolean, default: true }
        }],
        // validate: {
        //     validator: function (v) {
        //         return v.length > 0;
        //     },
        //     message: 'At least one schedule entry required'
        // }
    },
    academicPeriod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicPeriod',
        required: false
    },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        index: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        index: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        index: true
    },
    enrolledStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
        enrollmentDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['active', 'waitlisted', 'withdrawn', 'completed'],
            default: 'active'
        },
        _id: false
    }],

    // ======================= 🔹 CAPACITY MANAGEMENT =======================
    maxCapacity: {
        type: Number,
        min: 1,
    },
    waitlistCapacity: {
        type: Number,
        default: 0
    },

    // ======================= 🔹 SYSTEM FLAGS =======================
    isActive: {
        type: Boolean,
        default: true,
        index: true
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
        ref: 'User',
        required: false,
        default: new mongoose.Types.ObjectId()
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

// ======================= 🔹 VIRTUAL PROPERTIES =======================
classSchema.virtual('currentEnrollment').get(function () {
    return this.enrolledStudents.filter(s => s.status === 'active').length;
});

classSchema.virtual('availableSeats').get(function () {
    return this.maxCapacity - this.currentEnrollment;
});

classSchema.virtual('isFull').get(function () {
    return this.currentEnrollment >= this.maxCapacity;
});

// ======================= 🔹 INDEXES =======================
classSchema.index({ course: 1, academicPeriod: 1 });
classSchema.index({ teacher: 1, academicPeriod: 1 });
classSchema.index({ room: 1, academicPeriod: 1 });
classSchema.index({ 'schedule.day': 1, 'schedule.startTime': 1 });

// ======================= 🔹 PRE-SAVE VALIDATION =======================
// classSchema.pre('save', async function (next) {
//     // Validate room capacity
//     if (this.room) {
//         const room = await mongoose.model('Room').findById(this.room);
//         if (room && this.maxCapacity > room.capacity) {
//             throw new Error(`Class capacity exceeds room capacity`);
//         }
//     }

//     // Validate teacher availability
//     if (this.teacher && this.academicPeriod) {
//         const conflictingClasses = await mongoose.model('Class').find({
//             teacher: this.teacher,
//             academicPeriod: this.academicPeriod,
//             isActive: true,
//             _id: { $ne: this._id }
//         });

//         const hasConflict = conflictingClasses.some(cClass => {
//             return this.schedule.some(newSlot => {
//                 return cClass.schedule.some(existingSlot => {
//                     return newSlot.day === existingSlot.day &&
//                         newSlot.startTime < existingSlot.endTime &&
//                         newSlot.endTime > existingSlot.startTime;
//                 });
//             });
//         });

//         if (hasConflict) {
//             throw new Error('Teacher has conflicting class schedule');
//         }
//     }

//     next();
// });  // This was missing

const Class = mongoose.model('Class', classSchema);
export default Class;