const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Adjust the path as necessary

// A test route to check database connection
router.get('/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()'); // This will get the current timestamp
        res.json({
            message: 'Database connected successfully!',
            time: result.rows[0].now,
        });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({
            message: 'Failed to connect to the database.',
            error: error.message,
        });
    }
});

module.exports = router;
