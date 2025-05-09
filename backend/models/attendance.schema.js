import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'personModel'
    },
    personModel: {
        type: String,
        required: true,
        enum: ['Student', 'Teacher', 'Staff']
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        default: null
    },
    date: {
        type: Date,
        required: true,
        default: () => new Date(new Date().setHours(0, 0, 0, 0))
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Excused'],
        required: true
    },
    checkInTime: Date,
    checkOutTime: Date,
    remarks: {
        type: String,
        maxlength: 200
    }
}, { timestamps: true });

// Ensure one attendance per person per day
attendanceSchema.index({ person: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
