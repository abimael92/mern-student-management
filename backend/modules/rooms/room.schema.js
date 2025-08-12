import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    roomId: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        default: function () {
            return `ROOM${Math.floor(100 + Math.random() * 900)}`;
        }
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },

    currentOccupancy: [{
        period: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AcademicPeriod'
        },
        schedule: {
            day: String, // "Monday", "Tuesday", etc.
            startTime: String, // "09:00"
            endTime: String, // "10:30"
            active: { type: Boolean, default: true }
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
    }],

    // ======================= 🔹 LOCATION & TYPE =======================
    building: {
        type: String,
        required: true,
        enum: ['Main', 'Science', 'Arts', 'Gym', 'Annex'],
        default: 'Main'
    },
    floor: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    roomType: {
        type: String,
        required: true,
        enum: ['Classroom', 'Lab', 'Auditorium', 'Gymnasium', 'Specialized'],
        default: 'Classroom'
    },
    departmentRestriction: {
        type: String,
        enum: ['STEM', 'Humanities', 'Arts', 'None'],
        default: 'None'
    },

    // ======================= 🔹 CAPACITY & EQUIPMENT =======================
    seatingCapacity: {
        type: Number,
        required: true,
        min: 1,
        max: 300,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    examCapacity: {
        type: Number,
        default: function () {
            return Math.floor(this.seatingCapacity * 0.7);
        }
    },
    hasProjector: { type: Boolean, default: false },
    hasSmartBoard: { type: Boolean, default: false },
    labEquipment: [String],
    isWheelchairAccessible: { type: Boolean, default: true },

    // ======================= 🔹 AVAILABILITY =======================
    availablePeriods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicPeriod'
    }],
    maintenanceSchedule: {
        nextMaintenance: Date,
        frequencyDays: Number
    },
    isActive: {
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

// Virtual for room's full location
roomSchema.virtual('fullLocation').get(function () {
    return `${this.building}-${this.floor}${this.displayName}`;
});

// ======================= 🔹 STATIC METHODS =======================
roomSchema.statics.getAvailability = async function (roomId, periodId) {
    return this.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(roomId) } },
        { $unwind: "$currentOccupancy" },
        { $match: { "currentOccupancy.period": mongoose.Types.ObjectId(periodId) } },
        { $project: { bookedSlots: "$currentOccupancy.schedule" } }
    ]);
};

roomSchema.statics.findAvailableRooms = async function ({ day, startTime, endTime, capacity, roomType }) {
    return this.find({
        seatingCapacity: { $gte: capacity || 1 },
        roomType: roomType || { $exists: true },
        isActive: true,
        $nor: [{
            currentOccupancy: {
                $elemMatch: {
                    'schedule.day': day,
                    'schedule.active': true,
                    $or: [
                        { 'schedule.startTime': { $lt: endTime, $gte: startTime } },
                        { 'schedule.endTime': { $gt: startTime, $lte: endTime } }
                    ]
                }
            }
        }]
    });
};

// ======================= 🔹 INDEXES =======================
roomSchema.index({ building: 1, floor: 1 });
roomSchema.index({ roomType: 1 });
roomSchema.index({ seatingCapacity: 1 });
roomSchema.index({ departmentRestriction: 1 });

const Room = mongoose.model('Room', roomSchema);
export default Room;
