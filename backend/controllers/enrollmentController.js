const Enrollment = require('../models/Enrollment');
const Class = require('../models/Class');

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('classId');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('classId');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    // Check if class exists
    const classExists = await Class.findById(req.body.classId);
    if (!classExists) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const enrollment = new Enrollment({
      studentName: req.body.studentName,
      email: req.body.email,
      phone: req.body.phone,
      classId: req.body.classId
    });

    const newEnrollment = await enrollment.save();
    const populatedEnrollment = await Enrollment.findById(newEnrollment._id).populate('classId');
    res.status(201).json(populatedEnrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('classId');
    if (!updatedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json(updatedEnrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
