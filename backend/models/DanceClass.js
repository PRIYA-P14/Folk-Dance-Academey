const mongoose = require('mongoose');

const danceClassSchema = new mongoose.Schema({
    className: { type: String, required: true },
    danceType: { type: String, required: true }, // e.g., Theru Koothu, Poi Kal Kudhirai
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: String, required: true },
    fees: { type: Number, required: true },
    slots: { type: Number, required: true },
    image: { type: String, required: true }, // URL or path
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

module.exports = mongoose.model('DanceClass', danceClassSchema);
