const express = require('express');
const app = express();

const routes = require('./routes'); // Assuming you have routes in a separate file
const { connectToDatabase } = require('./config/database');

app.use(express.json()); // For parsing application/json

// Use your routes
app.use('/api', routes);

// our root endpoint
app.get('/', (req,res) => { // Remove req if not needed
    res.send('Hello, World! My name is Kevin Serafin');
});

// Handle 404 for unknown routes
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
