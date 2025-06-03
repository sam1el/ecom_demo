const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

async function cartRoutes(fastify, opts) {
  fastify.get('/cart', { preValidation: [fastify.authenticate] }, getCart);
  fastify.post('/cart', { preValidation: [fastify.authenticate] }, addToCart);
  fastify.delete('/cart', { preValidation: [fastify.authenticate] }, removeFromCart);
}

module.exports = cartRoutes;
