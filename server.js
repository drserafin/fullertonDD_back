// Import the express module
const express = require('express');

// Create an instance of the express application
const app = express();

// Define the port to listen on
const PORT = process.env.PORT || 8080;

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Respond with a simple message
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
