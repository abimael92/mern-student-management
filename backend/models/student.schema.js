import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    // 🔹 General Identification
    studentNumber: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /^ST\d{4}-\d{3}$/.test(value) // Example: ST2022-001
            },
            message: props => `${props.value} is not a valid student number!`
        }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String, default: '' },

    // 🔹 Personal Details
    dateOfBirth: { type: String, default: null },
    age: { type: Number, default: null },
    nationality: { type: String, default: null },

    // 🔹 Contact Information
    contactInfo: {
        phone: { type: String, default: null },
        email: { type: String, default: null },
    },
    address: {
        street: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        zipCode: { type: String, default: null },
    },
    emergencyContact: {
        name: { type: String, default: null },
        relation: { type: String, default: null },
        phone: { type: String, default: null },
    },

    // 🔹 Academic Status
    isEnrolled: { type: Boolean, required: true },
    enrollmentDate: { type: Date, default: Date.now },

    // 🔹 Health Info
    medicalInfo: {
        allergies: { type: [String], default: [] },
        nurseComments: { type: String, default: '' },
    },

    // 🔹 Alerts (behavioral/academic flags)
    alerts: {
        behavior: { type: String, default: '' },
        academic: { type: String, default: '' },
        flag: {
            type: String,
            enum: ['warning', 'success', 'none'],
            default: 'none'
        }
    },

    // 🔹 Linked References
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', default: null }, // for actual classroom object
    grades: [{
        subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        grade: { type: String, default: '' }
    }]
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
