// 📁 models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    roomNumber: { type: String, required: true },
    capacity: { type: Number },

    // ======================= 🔹 PERSONAL DETAILS =======================
    locationDescription: { type: String },

    // ======================= 🔹 META & TIMESTAMPS =======================
}, { timestamps: true });

roomSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
roomSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Room', roomSchema);
