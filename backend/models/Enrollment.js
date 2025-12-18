const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    danceClass: { type: mongoose.Schema.Types.ObjectId, ref: 'DanceClass', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' },
    enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
