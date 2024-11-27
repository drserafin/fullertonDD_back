const  User = require('../models/users/User');
const Address = require('../models/users/UserAddress');
const Payment = require('../models/users/UserPayment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Used for generating JWT tokens


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Corrected to req.body

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Log to verify if the model is loaded correctly
        console.log('User model:', User);

        // Hash password before saving to ensure it is stored securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Using Sequelize's create method (recommended approach)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Send a response excluding the password from the response for security
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { user_id: newUser.user_id, username: newUser.username, email: newUser.email } 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords to check if they match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate a JWT token on successful login
        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the user
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.user_id; // Assuming the user ID is stored in the request after JWT verification

        // Retrieve user data along with associated addresses and payments
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
        const userId = req.user.user_id; // Assuming the user ID is extracted from JWT

        // Ensure that there is data in the request body to update
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No data provided to update' });
        }

        // Update user profile
        const updatedUser = await User.update(req.body, { where: { user_id: userId } });

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
