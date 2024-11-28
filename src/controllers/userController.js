const User = require('../models/users/User');
const jwt = require('jsonwebtoken'); // Used for generating JWT tokens
const { verifyGoogleToken } = require('../utils/auth');

// Login a user (using OAuth, no password)
const loginUser = async (req, res) => {
  try {
    const { accessToken } = req.body; // Only accessToken is required, no email or password needed

    const oauthUser = await verifyGoogleToken(accessToken);

    // Check if email is provided
    if (!oauthUser) {
      return res.status(400).json({ message: 'Failed to verify Google User' });
    }

    const email = oauthUser.email;

    // Find user by email
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        email,
        username: email, // Set username as email
      });
    }

    // Generate a JWT token on successful login (no password check needed)
    const token = jwt.sign(
      { user_id: user.dataValues.user_id, email: user.dataValues.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token to the user
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Exporting all functions at the bottom
module.exports = {
  loginUser,
};
