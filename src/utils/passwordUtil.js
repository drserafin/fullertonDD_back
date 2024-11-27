const bcrypt = require('bcryptjs');

// Hash a password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Compare a password with the hashed password
const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePasswords
};
