import mongoose from 'mongoose';

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

const Room = mongoose.model('Room', roomSchema);
export default Room;
