// models/Alert.js
import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    type: { type: String, required: true }, // e.g., 'Medical', 'Behavioral'
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    acknowledged: { type: Boolean, default: false }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
