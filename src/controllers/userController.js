const { User, Address, Payment } = require('../models/users/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Used for generating JWT tokens

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password before saving to ensure it is stored securely
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords to check if they match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate a JWT token on successful login
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is stored in the request after JWT verification

        const user = await User.findByPk(userId, {
            include: [
                { model: Address, as: 'addresses' },
                { model: Payment, as: 'payments' }
            ]
        });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Update user profile (protected route)
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is extracted from JWT

        const updatedUser = await User.update(req.body, { where: { id: userId } });

        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: req.body });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

// Exporting all functions at the bottom
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};
