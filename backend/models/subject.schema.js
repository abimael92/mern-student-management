import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    description: { type: String, default: '' },
    classLevel: { type: String, default: '' },

    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: [] }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: [] }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },

    weeklyHours: { type: Number, default: 0 }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
