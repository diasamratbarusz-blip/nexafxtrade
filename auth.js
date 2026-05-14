/**
 * Nexafxtrade Authentication Controller
 * Path: ./controllers/auth.js
 * Description: Handles User Sign-up, Sign-in, and Token Generation
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. USER MODEL (Defined here for simplicity, or import from ../models/User)
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true }, // Key for Kenyan market
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    referrer: { type: String, default: null }, // For the 10% referral bonus
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

/**
 * REGISTER NEW USER
 */
exports.register = async (req, res) => {
    try {
        const { phone, password, referrer } = req.body;

        // Check if user already exists
        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            phone,
            password: hashedPassword,
            referrer: referrer || null
        });

        await user.save();

        // Create JWT Token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: { phone: user.phone, balance: user.balance }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error during registration");
    }
};

/**
 * LOGIN USER
 */
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Find user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare password with hashed version
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                phone: user.phone,
                balance: user.balance
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error during login");
    }
};

/**
 * GET CURRENT USER DATA (To refresh balance on dashboard)
 */
exports.getMe = async (req, res) => {
    try {
        // req.user is set by your authMiddleware (needed for protected routes)
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error fetching user data");
    }
};
