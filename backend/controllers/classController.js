const DanceClass = require('../models/DanceClass');

// Get all classes
exports.getClasses = async (req, res) => {
    try {
        const classes = await DanceClass.find();
        res.json(classes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get single class
exports.getClass = async (req, res) => {
    try {
        const danceClass = await DanceClass.findById(req.params.id);
        if (!danceClass) return res.status(404).json({ msg: 'Class not found' });
        res.json(danceClass);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create class (Admin only)
exports.createClass = async (req, res) => {
    try {
        const newClass = new DanceClass(req.body);
        const savedClass = await newClass.save();
        res.json(savedClass);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update class
exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await DanceClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedClass);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete class
exports.deleteClass = async (req, res) => {
    try {
        await DanceClass.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Class removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
