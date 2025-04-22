import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            maxlength: [50, 'Last name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            validate: {
                validator: function (v) {
                    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        subjects: {
            type: [String],
            required: [true, 'At least one subject is required'],
            enum: {
                values: ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages'],
                message: '{VALUE} is not a valid subject'
            }
        },
        qualifications: {
            type: [String],
            required: [true, 'Qualifications are required'],
            enum: {
                values: ['Bachelors', 'Masters', 'PhD', 'Teaching Certificate', 'Diploma'],
                message: '{VALUE} is not a valid qualification'
            }
        },
        joiningDate: {
            type: Date,
            required: [true, 'Joining date is required'],
            validate: {
                validator: function (v) {
                    return v <= new Date();
                },
                message: 'Joining date cannot be in the future'
            }
        },
        isActive: {
            type: Boolean,
            default: true
        },
        profilePicture: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
                },
                message: props => `${props.value} is not a valid URL!`
            }
        },
        address: {
            street: { type: String, maxlength: [100, 'Street cannot exceed 100 characters'] },
            city: { type: String, maxlength: [50, 'City cannot exceed 50 characters'] },
            state: { type: String, maxlength: [50, 'State cannot exceed 50 characters'] },
            zipCode: { type: String, maxlength: [20, 'Zip code cannot exceed 20 characters'] },
            country: { type: String, default: 'United States', maxlength: [50, 'Country cannot exceed 50 characters'] }
        },
        emergencyContact: {
            name: { type: String, maxlength: [100, 'Name cannot exceed 100 characters'] },
            relation: { type: String, maxlength: [50, 'Relation cannot exceed 50 characters'] },
            phone: {
                type: String,
                validate: {
                    validator: function (v) {
                        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
                    },
                    message: props => `${props.value} is not a valid phone number!`
                }
            }
        },
        classesAssigned: [{
            class: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Class'
            },
            subject: {
                type: String,
                enum: {
                    values: ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computers', 'Languages'],
                    message: '{VALUE} is not a valid subject'
                }
            },
            schedule: {
                days: [{
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                }],
                startTime: String,
                endTime: String
            }
        }],
        salary: {
            base: { type: Number, min: [0, 'Salary cannot be negative'] },
            currency: { type: String, default: 'USD' },
            paymentSchedule: { type: String, enum: ['monthly', 'bi-weekly', 'weekly'], default: 'monthly' }
        },
        yearsOfExperience: {
            type: Number,
            min: [0, 'Experience cannot be negative'],
            max: [50, 'Experience seems unrealistic']
        },
        vacations: [{
            startDate: { type: Date, required: true },
            endDate: {
                type: Date,
                required: true,
                validate: {
                    validator: function (v) {
                        return v > this.startDate;
                    },
                    message: 'End date must be after start date'
                }
            },
            type: { type: String, enum: ['paid', 'unpaid', 'sick'], default: 'paid' },
            approved: { type: Boolean, default: false }
        }],
        performanceReviews: [{
            date: { type: Date, default: Date.now },
            reviewer: { type: String, required: true },
            rating: { type: Number, min: 1, max: 5 },
            comments: String
        }],
        attendance: [{
            date: { type: Date, default: Date.now },
            status: { type: String, enum: ['present', 'absent', 'late', 'on leave'], default: 'present' },
            notes: String
        }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtuals
teacherSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

teacherSchema.virtual('yearsAtSchool').get(function () {
    return new Date().getFullYear() - this.joiningDate.getFullYear();
});

// Indexes
teacherSchema.index({ lastName: 1, firstName: 1 });
teacherSchema.index({ 'classesAssigned.class': 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;