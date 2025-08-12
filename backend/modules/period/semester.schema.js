import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

semesterSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
semesterSchema.set('toJSON', { virtuals: true });

const Semester = mongoose.model('Semester', semesterSchema);
export default Semester;
