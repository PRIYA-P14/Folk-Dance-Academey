const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.get('/', classController.getClasses);
router.get('/:id', classController.getClass);

// Admin only routes
router.post('/', auth, admin, classController.createClass);
router.put('/:id', auth, admin, classController.updateClass);
router.delete('/:id', auth, admin, classController.deleteClass);

module.exports = router;
