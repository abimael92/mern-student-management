import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    // 🔹 General Info
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    semester: { type: String },
    grade: { type: String },

    // 🔹 Linked Entities
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null }, // optional main instructor
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: [] }], // co-teachers or subject-specific

    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: [] }],
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', default: null }


}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
