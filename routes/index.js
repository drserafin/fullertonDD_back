const express = require('express');
const router = express.Router();

const testRoute = require('./testRoute');

// Use our routers, any request made to our first argument will be handled by the second argument
router.use('/test', testRoute);

module.exports = router;