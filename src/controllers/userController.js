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

const getUsers = async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await User.findAll(); // Fetch all users
  
      // Check if users exist
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      // Send the users list as a response
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  };

const getTokenByUsername = async (req, res) => {
    try {
      const { username } = req.params;
  
      // Find user by username
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate JWT token for the user
      const token = jwt.sign(
        { user_id: user.user_id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Send the token back to the client
      res.status(200).json({ message: 'Token generated successfully', token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ message: 'Error generating token', error });
    }
  };

  const getUsernameByToken = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header
  
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }
  
      // Verify the JWT token
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }
  
        // Extract user_id or username from the decoded token
        const { user_id } = decoded;
  
        // Find the user by user_id
        const user = await User.findOne({ where: { user_id } });
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Send the username back
        res.status(200).json({ username: user.username });
      });
    } catch (error) {
      console.error('Error extracting username from token:', error);
      res.status(500).json({ message: 'Error extracting username', error });
    }
  };
  

// Exporting all functions at the bottom
module.exports = {
  loginUser,
  getUsers,
  getTokenByUsername,
  getUsernameByToken,
};
