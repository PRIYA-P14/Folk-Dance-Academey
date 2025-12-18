const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// User routes (Protected)
router.post('/', auth, enrollmentController.createEnrollment);
router.get('/my-enrollments', auth, enrollmentController.getUserEnrollments);

// Admin routes (Protected)
router.get('/all', auth, admin, enrollmentController.getAllEnrollments);
router.put('/:id', auth, admin, enrollmentController.updateEnrollmentStatus);
router.delete('/:id', auth, admin, enrollmentController.deleteEnrollment);

module.exports = router;
