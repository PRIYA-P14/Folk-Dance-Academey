const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create Token
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Create Token
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });

        console.log('Login successful for:', email, 'with role:', user.role);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Forgot Password - Generate reset token
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User with this email does not exist' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = await bcrypt.hash(resetToken, 10);

        // Save reset token and expiry to user
        user.resetToken = resetTokenHash;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // In production, send email with reset link
        // For now, we'll just return the token (in real app, send via email)
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        console.log('Password reset link:', resetLink);

        // For testing/demo purposes, you can log the token
        res.json({ msg: 'Password reset link sent to your email!', resetLink });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Reset Password - Verify token and update password
exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ msg: 'Token and password are required' });
        }

        // Find user with valid reset token
        const users = await User.find();
        let user = null;

        for (let u of users) {
            if (u.resetToken && await bcrypt.compare(token, u.resetToken)) {
                if (u.resetTokenExpiry > Date.now()) {
                    user = u;
                    break;
                }
            }
        }

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired reset token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update password and clear reset token
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ msg: 'Password reset successfully!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
