import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    noteText: { type: String, required: true },

    // ======================= 🔹 PERSONAL DETAILS =======================
    dateCreated: { type: Date, default: Date.now },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

noteSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
noteSchema.set('toJSON', { virtuals: true });

const Note = mongoose.model('Note', noteSchema);
export default Note;
