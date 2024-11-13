const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Remove "Bearer " prefix from the token if it exists
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    req.userId = decoded.userId; // Attach the userId to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid', error: err.message });
  }
};

module.exports = authMiddleware;
