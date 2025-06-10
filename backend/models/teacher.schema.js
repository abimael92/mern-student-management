const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================  
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    // ======================= 🔹 ACADEMIC STATUS =======================  
    status: { type: String, enum: ['active', 'retired', 'on leave'], default: 'active' },

    // ======================= 🔹 CONTACT INFORMATION =======================  
    email: { type: String, required: true, unique: true },
    phone: { type: String },

    // ======================= 🔹 PERSONAL DETAILS =======================  
    hireDate: { type: Date, default: Date.now },

    // ======================= 🔹 SYSTEM REFERENCES =======================  
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    extracurriculars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Extracurricular' }],

    // ======================= 🔹 META & TIMESTAMPS =======================
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ======================= 🔹 VIRTUALS =======================
teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

teacherSchema.virtual('yearsAtSchool').get(function () {
    if (!this.hireDate) return 0;
    const diff = Date.now() - this.hireDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

module.exports = mongoose.model('Teacher', teacherSchema);
