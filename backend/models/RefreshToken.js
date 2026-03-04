import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7 * 24 * 60 * 60 // TTL index: auto-delete after 7 days
    },
    revokedAt: {
        type: Date,
        default: null
    },
    replacedByToken: {
        type: String,
        default: null
    },
    ipAddress: {
        type: String,
        default: null
    },
    userAgent: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Indexes for better query performance
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ user: 1, revokedAt: 1 });
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Method to check if token is expired
refreshTokenSchema.methods.isExpired = function () {
    return this.expiresAt < new Date();
};

// Method to check if token is revoked
refreshTokenSchema.methods.isRevoked = function () {
    return this.revokedAt !== null;
};

// Method to check if token is valid
refreshTokenSchema.methods.isValid = function () {
    return !this.isExpired() && !this.isRevoked();
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshToken;