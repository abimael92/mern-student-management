import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    // ======================= 🔹 CORE IDENTIFICATION =======================
    studentNumber: {
        type: String,
        unique: true,
        default: '',
        validate: {
            validator: function (value) {
                return value === '' || /^ST\d{4}-\d{3}$/.test(value);
            },
            message: props => `${props.value} is not a valid student number!`
        }
    },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    profilePicture: { type: String, default: '' },

    // ======================= 🔹 ACADEMIC STATUS =======================
    isActive: { type: Boolean, default: true },
    enrollmentDate: { type: Date, default: null },
    gradeLevel: { type: Number, default: null, min: 1, max: 12 },
    homeroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', default: null },

    // ======================= 🔹 CONTACT INFORMATION =======================
    contact: {
        email: { type: String, lowercase: true, default: '' },
        phone: { type: String, default: '' },
        address: {
            street: { type: String, default: '' },
            city: { type: String, default: '' },
            state: { type: String, default: '' },
            postalCode: { type: String, default: '' },
            country: { type: String, default: '' }
        }
    },
    emergencyContacts: [{
        name: { type: String, default: '' },
        relationship: { type: String, default: '' },
        phone: { type: String, default: '' },
        priority: { type: Number, default: 1 }
    }],

    // ======================= 🔹 PERSONAL DETAILS =======================
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, default: '', enum: ['', 'male', 'female', 'other', 'prefer-not-to-say'] },
    nationality: { type: String, default: '' },

    // ======================= 🔹 SYSTEM REFERENCES =======================
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        default: []
    }],
    advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
    extracurriculars: [{
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'ExtraCurricular', default: null },
        role: { type: String, default: '' }
    }],
    noteIds: [{ type: mongoose.Types.ObjectId, ref: 'StudentNote' }],

    // ======================= 🔹 META & TIMESTAMPS =======================
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

studentSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

studentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
