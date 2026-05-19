/**
 * Nexafxtrade Authentication Controller
 * Path: ./controllers/auth.js
 * Description: Handles User Sign-up, Sign-in, and Token Generation
 * Complete integration version - Restricting registration to phone and password schemas
 * Version: 3.3.0 (May 2026)
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. USER MODEL (Inlined explicitly to preserve entire asset configuration context)
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true }, // Key identity vector for Kenyan market
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    referrer: { type: String, default: null }, // Core hook for the 10% network referral engine bonus
    createdAt: { type: Date, default: Date.now }
});

// Safeguard against redefining the model compilation inside live reload node execution layers
const User = mongoose.models.User || mongoose.model('User', userSchema);

/**
 * REGISTER NEW USER
 * Handles secure, phone-based platform enrollment parameters
 */
exports.register = async (req, res) => {
    try {
        const { phone, password, referrer } = req.body;

        // Strict validation checks for baseline input sanity
        if (!phone || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing phone or password registration payload parameter" 
            });
        }

        // Check if user already exists in the system database collection
        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ 
                success: false, 
                message: "Phone number already registered in the Nexafx matrix" 
            });
        }

        // Hash the password using a high-factor salt generation routine
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Build user record with verified structural variables
        user = new User({
            phone,
            password: hashedPassword,
            referrer: referrer || null
        });

        await user.save();

        // Sign a persistent JWT Token for immediate access pass issuance
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || 'fallback_jwt_secret_nexafx_2026', 
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: { 
                id: user._id, 
                phone: user.phone, 
                balance: user.balance 
            }
        });

    } catch (err) {
        console.error("Critical Exception in Nexafxtrade Register Engine:", err);
        res.status(500).json({ 
            success: false, 
            message: "Server Error during registration routine processing" 
        });
    }
};

/**
 * LOGIN USER
 * Authenticates user credentials via phone identities
 */
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Force validation check on absolute execution properties
        if (!phone || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing credential tracking fields input" 
            });
        }

        // Find user by unique phone identifier string
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid Credentials: Node not found" 
            });
        }

        // Compare password with hashed version stored in the secure DB document
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid Credentials: Password mismatch" 
            });
        }

        // Create fresh JWT Authorization Token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || 'fallback_jwt_secret_nexafx_2026', 
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
        console.error("Critical Exception in Nexafxtrade Login Engine:", err);
        res.status(500).json({ 
            success: false, 
            message: "Server Error during system login processing" 
        });
    }
};

/**
 * GET CURRENT USER DATA
 * Refreshes user account state data seamlessly without leaking sensitive hashes
 */
exports.getMe = async (req, res) => {
    try {
        // req.user mapping parameters are injected via downstream authMiddleware pipeline structures
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ 
                success: false, 
                message: "Authorization tracking footprint missing" 
            });
        }

        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User profile record data matrix not found" 
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (err) {
        console.error("Critical Exception in Nexafxtrade Profile Data Fetching:", err);
        res.status(500).json({ 
            success: false, 
            message: "Server Error fetching user dashboard parameters" 
        });
    }
};
