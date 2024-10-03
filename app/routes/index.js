// routes/index.js
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
};
