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
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    profilePicture: {
        type: String,
        default: '',
    },
    teacherNumber: {
        type: String,
        required: true,
        unique: true
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject', default: [] }],
    totalWeeklyHours: { type: Number, default: 0 },
    qualifications: {
        type: [String],
        default: [],
        enum: ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma', 'Recognition', 'Certificate']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        base: { type: Number, min: 0 },
        currency: { type: String, default: 'USD' },
        paymentSchedule: { type: String, enum: ['monthly', 'bi-weekly', 'weekly'], default: 'monthly' }
    },
    address: {
        street: { type: String, maxlength: 100 },
        city: { type: String, maxlength: 50 },
        state: { type: String, maxlength: 50 },
        zipCode: { type: String, maxlength: 20 },
        country: { type: String, default: 'United States', maxlength: 50 }
    },
    emergencyContact: {
        name: { type: String, maxlength: 100 },
        relation: { type: String, maxlength: 50 },
        phone: {
            type: String,
            validate: {
                validator: (v) => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v),
                message: props => `${props.value} is not a valid phone number!`
            }
        }
    },
    // Classes assigned (hourly, Mon-Fri, 8am-4pm)
    classesAssigned: [{
        classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
        subject: {
            type: String,
            enum: ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages'],
            required: true
        },
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            required: true
        },
        hour: {
            type: Number,
            min: 8,
            max: 16,
            required: true
        }
    }],
    // Attendance reference (external schema)
    attendance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
    // Performance reviews
    performanceReviews: [{
        date: { type: Date, default: Date.now },
        reviewer: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5 },
        comments: String
    }],
    // Notes left for students
    studentNotes: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        note: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    // Students they tutor
    tutoredStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, { timestamps: true });

// Virtuals
teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
teacherSchema.virtual('yearsAtSchool').get(function () {
    return new Date().getFullYear() - this.joiningDate.getFullYear();
});

// Middleware
teacherSchema.pre('remove', async function (next) {
    try {
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
