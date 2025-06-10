// 📁 models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },

    // ======================= 🔹 PERSONAL DETAILS =======================
    description: { type: String },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

subjectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
subjectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Subject', subjectSchema);
