const Enrollment = require('../models/Enrollment');
const DanceClass = require('../models/DanceClass');
const Payment = require('../models/Payment');

// Create enrollment with payment
exports.createEnrollment = async (req, res) => {
    try {
        const { danceClassId, transactionId, amount } = req.body;
        const userId = req.user.id; // from auth middleware

        // Check if class exists
        const danceClass = await DanceClass.findById(danceClassId);
        if (!danceClass) {
            return res.status(404).json({ msg: 'Dance class not found' });
        }

        // Check if slots are available
        if (danceClass.slots <= 0) {
            return res.status(400).json({ msg: 'No slots available for this class' });
        }

        // Check if user already enrolled
        const existingEnrollment = await Enrollment.findOne({
            user: userId,
            danceClass: danceClassId
        });

        if (existingEnrollment) {
            return res.status(400).json({ msg: 'You are already enrolled in this class' });
        }

        // Create enrollment
        const enrollment = new Enrollment({
            user: userId,
            danceClass: danceClassId,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await enrollment.save();

        // Create payment record
        const payment = new Payment({
            user: userId,
            enrollment: enrollment._id,
            amount: amount || danceClass.fees,
            transactionId: transactionId,
            status: 'pending'
        });

        await payment.save();

        // Decrease slot count
        danceClass.slots -= 1;
        await danceClass.save();

        res.json({
            msg: 'Enrollment created successfully. Payment verification pending.',
            enrollment,
            payment
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get user's enrollments
exports.getUserEnrollments = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const enrollments = await Enrollment.find({ user: userId })
            .populate('danceClass')
            .populate('user', '-password')
            .sort({ enrolledAt: -1 });

        res.json(enrollments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get all enrollments (Admin only)
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('danceClass')
            .populate('user', '-password')
            .sort({ enrolledAt: -1 });

        res.json(enrollments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Update enrollment status (Admin only)
exports.updateEnrollmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ msg: 'Enrollment not found' });
        }

        enrollment.status = status;
        await enrollment.save();

        res.json(enrollment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete enrollment
exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ msg: 'Enrollment not found' });
        }

        // Return slot to class
        const danceClass = await DanceClass.findById(enrollment.danceClass);
        if (danceClass) {
            danceClass.slots += 1;
            await danceClass.save();
        }

        await enrollment.deleteOne();
        res.json({ msg: 'Enrollment removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
