import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    description: { type: String, default: '' },
    classLevel: { type: String, default: '' },

    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: [] }],

    weeklyHours: { type: Number, default: 0 }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
