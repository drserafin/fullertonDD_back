const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

// Import all models
const User = require('./users/User');
const Address = require('./users/Address');
const Payment = require('./payments/Payment');
const TrackingDetail = require('./tracking/TrackingDetail');
const Product = require('./products/Product');
const ProdCategory = require('./products/ProdCategory');
const Cart = require('./cart/Cart');
const CartItem = require('./cart/CartItem');
const Order = require('./order/Order');
const OrderItem = require('./order/OrderItem');

// Define associations between models
Product.belongsTo(ProdCategory, { foreignKey: 'categoryId', as: 'category' });
ProdCategory.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

TrackingDetail.belongsTo(Order, { foreignKey: 'orderNo', as: 'order' });
Order.hasMany(TrackingDetail, { foreignKey: 'orderNo', as: 'trackingDetails' });

Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId', as: 'products' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId', as: 'carts' });

User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', as: 'products' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', as: 'orders' });

// Sync models with the database
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch((err) => console.log('Error syncing database:', err));

module.exports = {
  User,
  Address,
  Payment,
  TrackingDetail,
  Product,
  ProdCategory,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
