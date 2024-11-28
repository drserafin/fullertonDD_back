const User = require('../models/users/User');
const jwt = require('jsonwebtoken'); // Used for generating JWT tokens
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the same client ID used on the frontend
  });
  const payload = ticket.getPayload();
  console.log(payload);
  return payload; // Contains user information like email, name, etc.
};

// const registerUser = async (req, res) => {
//     try {
//         const { email } = req.body; // Only email is required, no username or password needed

//         // Check if email is provided
//         if (!email) {
//             return res.status(400).json({ message: 'Email is required' });
//         }

//         // Check if the user already exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(409).json({ message: 'User already exists' });  // Using 409 for conflict
//         }

//         // Create new user with email and set username to email
//         const newUser = await User.create({
//             email,
//             username: email // Set username as email
//         });

//         // Send a response with the user details (excluding sensitive data)
//         res.status(201).json({
//             message: 'User registered successfully',
//             user: { user_id: newUser.user_id, username: newUser.username, email: newUser.email }
//         });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Error registering user', error });
//     }
// };

// Login a user (using OAuth, no password)
const loginUser = async (req, res) => {
  try {
    const { accessToken, email } = req.body; // Only email is required for login

    const user = await verifyGoogleToken(accessToken)
    console.log(user);

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        email,
        username: email, // Set username as email
      });
    }

    // Generate a JWT token on successful login (no password check needed)
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
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
