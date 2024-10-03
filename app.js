const express = require('express');
const db = require('./config/database'); // Import the database connection

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
  });

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello, this is a test endpoint!' });
});




// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});