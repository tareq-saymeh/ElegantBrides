const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getModel = async (identifier) => {
    const user = await User.findOne({ email: identifier });
    if (user) return { user, model: 'User' };

    const admin = await Admin.findOne({ email: identifier });
    if (admin) return { user: admin, model: 'Admin' };

    return null;
};

// Generate JWT token
const generateToken = (user, role) => {
    return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// User Registration
exports.register = async (req, res) => {
    const { name, email, password, birthday } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, birthday });
        
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// User/Admin Login
exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        console.log('Login attempt:', { identifier });

        const userData = await getModel(identifier);
        console.log('User data:', userData);

        if (!userData) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const { user, model } = userData;

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ error: `Invalid credentials for ${identifier} with password ${password}` });
        }

        const token = generateToken(user, model);

        res.json({ token, role: model });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
