const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the same client ID used on the frontend
  });
  const payload = ticket.getPayload();
  return payload; // Contains user information like email, name, etc.
};

module.exports = {
  verifyGoogleToken,
};
