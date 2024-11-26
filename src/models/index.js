const sequelize = require('../config/database');  // Import the Sequelize instance

// Import all models
const User = require('./users/User');
const Address = require('./users/UserAddress');
const PaymentDetails = require('./payments/PaymentDetails');
const TrackingDetail = require('./tracking/TrackingDetail');
const Product = require('./products/Product');
const ProdCategory = require('./products/ProdCategory');
const Cart = require('./shoppingCart/Cart');
const CartItem = require('./shoppingCart/CartItem');
const Order = require('./order/Order');
const OrderDetails = require('./order/OrderDetails');
const OrderItem = require('./order/OrderItem');
const ShoppingSession = require('./sessions/shoppingSession');

// Define associations between models

// Product and ProdCategory
Product.belongsTo(ProdCategory, { foreignKey: 'categoryId', as: 'category' });
ProdCategory.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// User and Order
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User and Address
User.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User and PaymentDetails
User.hasMany(PaymentDetails, { foreignKey: 'userId', as: 'payments' });
PaymentDetails.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Order and TrackingDetail (Ensure unique aliases)
Order.hasMany(TrackingDetail, { foreignKey: 'orderNo', as: 'orderTrackingDetails' });
TrackingDetail.belongsTo(Order, { foreignKey: 'orderNo', as: 'orderDetails' });

// Cart and Product (Many-to-Many relationship via CartItem)
Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId', as: 'products' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId', as: 'carts' });

// Cart and CartItem (One-to-Many relationship)
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

// Order and Product (Many-to-Many relationship via OrderItem)
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', as: 'products' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', as: 'orders' });

// Order and OrderDetails
Order.hasMany(OrderDetails, { foreignKey: 'orderId', as: 'orderDetails' });
OrderDetails.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// OrderItem and Order
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });

// ShoppingSession and User
ShoppingSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(ShoppingSession, { foreignKey: 'userId', as: 'shoppingSession' });


// Sync only in non-test environments
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: true }) // Sync models with the database
    .then(() => console.log('Database synced successfully'))
    .catch((err) => console.log('Error syncing database:', err));
}


// Export the models and associations
module.exports = {
  User,
  Address,
  PaymentDetails,
  TrackingDetail,
  Product,
  ProdCategory,
  Cart,
  CartItem,
  Order,
  OrderDetails,
  OrderItem,
  ShoppingSession,
};
