const Order = require('../models/Order');
const Cart = require('../models/Cart');

async function createOrder(request, reply) {
  const cart = await Cart.findOne({ user: request.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) return reply.code(400).send({ error: 'Cart is empty' });
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const order = new Order({
    user: request.user.id,
    products: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
    total,
    status: 'pending',
  });
  await order.save();
  cart.items = [];
  await cart.save();
  return reply.code(201).send(order);
}

async function getOrders(request, reply) {
  const orders = await Order.find({ user: request.user.id }).populate('products.product');
  return reply.send(orders);
}

module.exports = { createOrder, getOrders };
