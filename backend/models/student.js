import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentNumber: {
        type: String,
        required: true,
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
    age: { type: Number, default: null },
    grade: { type: String, default: "N/A" },
    tutor: { type: String, default: "N/A" },
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
    isEnrolled: { type: Boolean, required: true },
    enrollmentDate: { type: Date, default: Date.now }, // Enrollment Date
});

const Student = mongoose.model('Student', studentSchema); // Capitalize 'Student' for consistency

export default Student;
