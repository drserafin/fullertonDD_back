const cron = require('node-cron');
const { Cart, Sequelize } = require('../models'); 

// Cron job to run at midnight every day
cron.schedule('0 0 * * *', async () => { // This runs at midnight every day
  const expirationTime = 24 * 60 * 60 * 1000;  // 24 hours in milliseconds

  try {
    // Find carts that belong to non-users (where user_id is null) and are older than 24 hours
    const cartsToDelete = await Cart.findAll({
      where: {
        user_id: null,  // Only target non-user carts
        updated_at: {
          [Sequelize.Op.lt]: new Date(Date.now() - expirationTime), // Less than 24 hours ago
        },
      },
    });

    if (cartsToDelete.length > 0) {
      // Delete the non-user carts that are older than 24 hours
      await Cart.destroy({
        where: {
          cart_id: cartsToDelete.map(cart => cart.cart_id),
        },
      });

      console.log(`${cartsToDelete.length} inactive non-user carts removed.`);
    } else {
      console.log('No inactive non-user carts to clean up.');
    }
  } catch (err) {
    console.error('Error cleaning up inactive non-user carts:', err);
  }
});
