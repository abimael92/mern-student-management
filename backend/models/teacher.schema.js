import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    // 🔹 General Identification
    teacherNumber: {
        type: String,
        required: true,
        unique: true
    },
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
    profilePicture: {
        type: String,
        default: '',
    },

    // 🔹 Contact Information
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

    // 🔹 Employment Details
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
    qualifications: {
        type: [String],
        default: [],
        enum: ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma', 'Recognition', 'Certificate']
    },
    totalWeeklyHours: { type: Number, default: 0 },

    // 🔹 Teaching Assignments
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
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

    // 🔹 Relations with Students
    tutoredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    tutorForStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],

    // 🔹 Attendance & Performance
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
    performanceReviews: [{
        date: { type: Date, default: Date.now },
        reviewer: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5 },
        comments: String
    }],
    studentNotes: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        note: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]

}, { timestamps: true });

// Virtuals
teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

teacherSchema.virtual('yearsAtSchool').get(function () {
    if (!this.joiningDate) return 0;
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
