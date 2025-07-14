import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    schedule: { type: String, default: null },// e.g. "Mon-Wed-Fri 10:00-11:00"

    // ======================= 🔹 SYSTEM REFERENCES =======================
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

classSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
classSchema.set('toJSON', { virtuals: true });

const Class = mongoose.model('Class', classSchema);
export default Class;
