import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        default: () => `ROOM${Math.floor(100 + Math.random() * 900)}`
    },
    displayName: {
        type: String,
        required: true
    },
    currentOccupancy: [{
        period: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicPeriod' },
        schedule: {
            day: String,
            startTime: String,
            endTime: String,
            active: Boolean
        },
        class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        isTemporary: Boolean,
        exceptionDetails: {
            reason: String,
            originalRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
        }
    }],
    building: String,
    floor: Number,
    roomType: String,
    departmentRestriction: String,
    seatingCapacity: Number,
    examCapacity: Number,
    hasProjector: Boolean,
    hasSmartBoard: Boolean,
    labEquipment: [String],
    isWheelchairAccessible: Boolean,
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    availablePeriods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AcademicPeriod' }],
    maintenanceSchedule: {
        nextMaintenance: Date,
        frequencyDays: Number
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

roomSchema.virtual('fullLocation').get(function () {
    return `${this.building}-${this.floor}${this.displayName}`;
});

roomSchema.virtual('temporaryBookings').get(function () {
    return this.currentOccupancy.filter(booking => booking.isTemporary);
});

roomSchema.statics.getAvailability = async function (roomId, periodId, options = {}) {
    const { includeTemporary = false } = options;
    return this.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(roomId) } },
        { $unwind: "$currentOccupancy" },
        { $match: { "currentOccupancy.period": mongoose.Types.ObjectId(periodId) } },
        { $project: { schedule: "$currentOccupancy.schedule" } }
    ]);
};

roomSchema.statics.findAvailableRooms = async function (filters) {
    const { day, startTime, endTime } = filters;
    return this.find({
        $nor: [{
            currentOccupancy: {
                $elemMatch: {
                    'schedule.day': day,
                    $or: [
                        { 'schedule.startTime': { $lt: endTime, $gte: startTime } },
                        { 'schedule.endTime': { $gt: startTime, $lte: endTime } }
                    ]
                }
            }
        }]
    });
};

roomSchema.methods.addTemporaryBooking = async function (bookingDetails) {
    this.currentOccupancy.push({
        schedule: bookingDetails.schedule,
        class: bookingDetails.classId,
        isTemporary: true,
        exceptionDetails: { reason: bookingDetails.reason }
    });
    return this.save();
};

roomSchema.index({ building: 1, floor: 1 });
roomSchema.index({ roomType: 1 });

const Room = mongoose.model('Room', roomSchema);
export default Room;