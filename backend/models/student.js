import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentNumber: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /^ST\d{4}-\d{3}$/.test(value); // Example: ST2022-001
            },
            message: props => `${props.value} is not a valid student number!`
        }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: {
        type: String,
        default: '',
    },

    age: { type: Number, default: null },
    grade: { type: String, default: "N/A" },
    classroomId: { type: String, default: null },
    tutor: { type: String, default: "N/A" },
    tutorId: { type: String, default: null },
    emergencyContact: {
        name: { type: String, default: "N/A" },
        relation: { type: String, default: "N/A" },
        phone: { type: String, default: "N/A" },
    },
    dateOfBirth: { type: String, default: "N/A" },
    nationality: { type: String, default: "N/A" },
    contactInfo: {
        phone: { type: String, default: "N/A" },
        email: { type: String, default: "N/A" },
    },
    address: {
        street: { type: String, default: "N/A" },
        city: { type: String, default: "N/A" },
        state: { type: String, default: "N/A" },
        zipCode: { type: String, default: "N/A" },
    },
    medicalInfo: {
        allergies: { type: [String], default: [] },
        nurseComments: { type: String, default: '' }
    },

    alerts: {
        behavior: { type: String, default: '' },
        academic: { type: String, default: '' },
        flag: {
            type: String,
            enum: ['warning', 'success', 'none'],
            default: 'none'
        }
    },
    isEnrolled: { type: Boolean, required: true },
    enrollmentDate: { type: Date, default: Date.now }, // Enrollment Date
});

const Student = mongoose.model('Student', studentSchema); // Capitalize 'Student' for consistency

export default Student;
