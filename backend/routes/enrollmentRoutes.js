const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// GET all enrollments
router.get('/', enrollmentController.getAllEnrollments);

// GET a single enrollment
router.get('/:id', enrollmentController.getEnrollmentById);

// POST a new enrollment
router.post('/', enrollmentController.createEnrollment);

// PUT update an enrollment
router.put('/:id', enrollmentController.updateEnrollment);

// DELETE an enrollment
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;
