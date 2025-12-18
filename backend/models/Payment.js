const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' }, // Verified by admin
    paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
