const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// User routes (Protected)
router.post('/', auth, feedbackController.createFeedback);
router.get('/my-feedback', auth, feedbackController.getUserFeedback);

// Admin routes (Protected)
router.get('/all', auth, admin, feedbackController.getAllFeedback);
router.put('/:id', auth, admin, feedbackController.updateFeedbackStatus);
router.delete('/:id', auth, admin, feedbackController.deleteFeedback);

module.exports = router;
