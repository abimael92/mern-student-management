import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    semester: { type: String },
    grade: { type: String },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
