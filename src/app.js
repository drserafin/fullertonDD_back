const express = require('express');
const app = express();
const routes = require('./routes'); 
const { connectToDatabase } = require('./config/database');
const path = require('path');

app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.get('/', (req,res) => { 
    res.send('Hello, World! My name is Kevin Serafin');
 });
 app.get('/api', (req,res) => { 
    res.send('Hello, API');
 });

 app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
