const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');

// Get all payments (Admin only)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('user', '-password')
            .populate({
                path: 'enrollment',
                populate: { path: 'danceClass' }
            })
            .sort({ paymentDate: -1 });

        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get user's payments
exports.getUserPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const payments = await Payment.find({ user: userId })
            .populate({
                path: 'enrollment',
                populate: { path: 'danceClass' }
            })
            .sort({ paymentDate: -1 });

        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Verify payment (Admin only)
exports.verifyPayment = async (req, res) => {
    try {
        const { status } = req.body; // 'verified' or 'failed'
        
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        payment.status = status;
        await payment.save();

        // Update enrollment payment status
        const enrollment = await Enrollment.findById(payment.enrollment);
        if (enrollment) {
            enrollment.paymentStatus = status;
            if (status === 'verified') {
                enrollment.status = 'approved';
            }
            await enrollment.save();
        }

        res.json({ msg: 'Payment status updated', payment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('user', '-password')
            .populate({
                path: 'enrollment',
                populate: { path: 'danceClass' }
            });

        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        res.json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
