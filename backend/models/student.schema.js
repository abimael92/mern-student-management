import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        studentNumber: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        age: {
            type: Number,
            default: null,
            min: [4, 'Age must be at least 4'],
            max: [25, 'Age must be at most 25'],
        },
        grade: {
            type: String,
            default: 'N/A',
            enum: ['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'N/A'],
        },
        tutor: {
            type: String,
            default: 'N/A',
        },
        emergencyContact: {
            name: {
                type: String,
                default: 'N/A',
            },
            relation: {
                type: String,
                default: 'N/A',
            },
            phone: {
                type: String,
                default: 'N/A',
            },
        },
        dateOfBirth: {
            type: String,
            default: 'N/A',
        },
        nationality: {
            type: String,
            default: 'N/A',
        },
        contactInfo: {
            phone: {
                type: String,
                default: 'N/A',
            },
            email: {
                type: String,
                default: 'N/A',
                lowercase: true,
                trim: true,
            },
        },
        address: {
            street: {
                type: String,
                default: 'N/A',
            },
            city: {
                type: String,
                default: 'N/A',
            },
            state: {
                type: String,
                default: 'N/A',
            },
            zipCode: {
                type: String,
                default: 'N/A',
            },
            // Added country while preserving your original structure
            country: {
                type: String,
                default: 'N/A',
            },
        },
        isEnrolled: {
            type: Boolean,
            required: true,
            default: true,
        },
        enrollmentDate: {
            type: Date,
            default: Date.now,
        },
        // Added new field for profile pictures
        profilePicture: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual for full name
studentSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Indexes for better query performance
studentSchema.index({ firstName: 'text', lastName: 'text' });
studentSchema.index({ studentNumber: 1 });

const Student = mongoose.model('Student', studentSchema);

export default Student;