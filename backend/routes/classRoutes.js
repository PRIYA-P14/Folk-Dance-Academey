const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// GET all classes
router.get('/', classController.getAllClasses);

// GET a single class
router.get('/:id', classController.getClassById);

// POST a new class
router.post('/', classController.createClass);

// PUT update a class
router.put('/:id', classController.updateClass);

// DELETE a class
router.delete('/:id', classController.deleteClass);

module.exports = router;
