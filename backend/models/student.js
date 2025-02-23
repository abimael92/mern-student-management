import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    regNo: {
        type: Number,
        required: true,
        unique: true
    },
    studentName: {
        type: String,
        required: true
    },
    grade: String,
    section: {
        type: String,
        default: 'Student A'
    }
});

const student = mongoose.model('student', studentSchema);

export default student;
