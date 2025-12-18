require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
    res.send('Folk Dance Class Management System API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dance_class_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // ✅ Serve images correctly
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/classes', require('./routes/classRoutes'));
// app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/feedback', require('./routes/feedbackRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));

// app.get('/', (req, res) => {
//     res.send('Folk Dance Class Management System API is running...');
// });

// // Database Connection
// mongoose.connect(
//     process.env.MONGO_URI || 'mongodb://localhost:27017/dance_class_db',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// )
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.error('MongoDB Connection Error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
