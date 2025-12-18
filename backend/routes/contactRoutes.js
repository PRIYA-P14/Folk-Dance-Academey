const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public route - Submit contact form
router.post('/', contactController.createContact);

// Admin routes - Manage contact submissions
router.get('/all', auth, admin, contactController.getAllContacts);
router.put('/:id', auth, admin, contactController.updateContactStatus);
router.delete('/:id', auth, admin, contactController.deleteContact);

module.exports = router;
