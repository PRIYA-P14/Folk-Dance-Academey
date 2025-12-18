const Class = require('../models/Class');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const classItem = new Class({
    name: req.body.name,
    description: req.body.description,
    instructor: req.body.instructor,
    schedule: req.body.schedule,
    duration: req.body.duration,
    level: req.body.level,
    price: req.body.price,
    maxStudents: req.body.maxStudents,
    imageUrl: req.body.imageUrl
  });

  try {
    const newClass = await classItem.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
