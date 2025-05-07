import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    subjects: {
        type: [String],
        required: true,
        enum: ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages']
    },
    tutoredStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

teacherSchema.pre('remove', async function (next) {
    try {
        // Remove this teacher reference from all tutored students
        await mongoose.model('Student').updateMany(
            { tutorId: this._id },
            { $set: { tutorId: null, tutor: "N/A" } }
        );
        next();
    } catch (err) {
        next(err);
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;