const { createOrder, getOrders } = require('../controllers/orderController');

async function orderRoutes(fastify, opts) {
  fastify.post('/orders', { preValidation: [fastify.authenticate] }, createOrder);
  fastify.get('/orders', { preValidation: [fastify.authenticate] }, getOrders);
}

module.exports = orderRoutes;
