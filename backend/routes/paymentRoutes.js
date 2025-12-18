const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// User routes (Protected)
router.get('/my-payments', auth, paymentController.getUserPayments);

// Admin routes (Protected)
router.get('/all', auth, admin, paymentController.getAllPayments);
router.get('/:id', auth, paymentController.getPaymentById);
router.put('/:id/verify', auth, admin, paymentController.verifyPayment);

module.exports = router;
