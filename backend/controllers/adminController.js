const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Payment = require('../models/Payment');
const DanceClass = require('../models/DanceClass');

// Get overall admin statistics
exports.getStats = async (req, res) => {
    try {
        const [userCount, enrollmentCount, paymentCount, classCount, revenueAgg] = await Promise.all([
            User.countDocuments({}),
            Enrollment.countDocuments({}),
            Payment.countDocuments({}),
            DanceClass.countDocuments({}),
            Payment.aggregate([
                { $match: { status: 'verified' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);

        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        res.json({
            users: userCount,
            enrollments: enrollmentCount,
            payments: paymentCount,
            classes: classCount,
            revenue: totalRevenue
        });
    } catch (err) {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
