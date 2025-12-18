require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dance_class_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected');

        // Delete existing admin if any
        await User.deleteOne({ email: 'admin@folkdance.com' });
        console.log('Old admin record deleted (if existed)');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Create fresh admin user with correct role
        const admin = new User({
            name: 'Admin User',
            email: 'admin@folkdance.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        
        console.log('');
        console.log('✅✅✅ ADMIN USER CREATED SUCCESSFULLY! ✅✅✅');
        console.log('-----------------------------------');
        console.log('Email: admin@folkdance.com');
        console.log('Password: admin123');
        console.log('Role: admin');
        console.log('-----------------------------------');
        console.log('');
        console.log('Now do this:');
        console.log('1. Open browser DevTools (F12)');
        console.log('2. Go to Console tab');
        console.log('3. Type: localStorage.clear()');
        console.log('4. Refresh page (F5)');
        console.log('5. Login with admin credentials above');
        console.log('');

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.error('Error creating admin user:', err);
        process.exit(1);
    }
};

createAdminUser();
