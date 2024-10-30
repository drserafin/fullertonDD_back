const express = require('express');
const app = express();
const routes = require('./routes'); 
const path = require('path');

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api', routes); // This allows access to all routes prefixed with /api

// Root route
app.get('/', (req, res) => { 
    res.send('Hello, World! My name is Kevin Serafin');
});

// API root route
app.get('/api', (req, res) => { 
    res.send('Hello, API');
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
