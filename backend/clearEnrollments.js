require('dotenv').config();
const mongoose = require('mongoose');
const Enrollment = require('./models/Enrollment');
const Payment = require('./models/Payment');

const clearEnrollments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dance_class_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected');

        // Delete all enrollments
        const enrollResult = await Enrollment.deleteMany({});
        console.log(`Deleted ${enrollResult.deletedCount} enrollments`);

        // Delete all payments
        const paymentResult = await Payment.deleteMany({});
        console.log(`Deleted ${paymentResult.deletedCount} payments`);

        console.log('\n✅ All enrollments and payments cleared successfully!');
        console.log('You can now enroll in classes with the newly seeded data.\n');

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.error('Error clearing enrollments:', err);
        process.exit(1);
    }
};

clearEnrollments();
