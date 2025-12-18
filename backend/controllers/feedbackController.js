const Feedback = require('../models/Feedback');

// Create feedback (User)
exports.createFeedback = async (req, res) => {
    try {
        const { subject, message, rating } = req.body;
        const userId = req.user.id;

        const feedback = new Feedback({
            user: userId,
            subject,
            message,
            rating
        });

        await feedback.save();

        res.status(201).json({
            msg: 'Feedback submitted successfully',
            feedback
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get user's own feedback
exports.getUserFeedback = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const feedbacks = await Feedback.find({ user: userId })
            .sort({ createdAt: -1 });

        res.json(feedbacks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get all feedback (Admin only)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('user', '-password')
            .sort({ createdAt: -1 });

        res.json(feedbacks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Update feedback status (Admin only)
exports.updateFeedbackStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ msg: 'Feedback not found' });
        }

        feedback.status = status;
        await feedback.save();

        res.json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete feedback (Admin only)
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ msg: 'Feedback not found' });
        }

        await feedback.deleteOne();
        res.json({ msg: 'Feedback removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
