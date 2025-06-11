import mongoose from 'mongoose';

const extracurricularSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    name: { type: String, required: true },

    // ======================= 🔹 DESCRIPTION =======================
    description: { type: String },
    category: { type: String, enum: ['sports', 'arts', 'clubs', 'volunteering', 'other'], default: 'other' },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const Extracurricular = mongoose.model('Extracurricular', extracurricularSchema);
export default Extracurricular;
