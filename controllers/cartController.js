const Cart = require('../models/Cart');
const Product = require('../models/Product');

async function getCart(request, reply) {
  const cart = await Cart.findOne({ user: request.user.id }).populate('items.product');
  return reply.send(cart || { items: [] });
}

async function addToCart(request, reply) {
  const { productId, quantity } = request.body;
  let cart = await Cart.findOne({ user: request.user.id });
  if (!cart) cart = new Cart({ user: request.user.id, items: [] });
  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  cart.updatedAt = new Date();
  await cart.save();
  return reply.send(cart);
}

async function removeFromCart(request, reply) {
  const { productId } = request.body;
  let cart = await Cart.findOne({ user: request.user.id });
  if (!cart) return reply.code(404).send({ error: 'Cart not found' });
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  cart.updatedAt = new Date();
  await cart.save();
  return reply.send(cart);
}

module.exports = { getCart, addToCart, removeFromCart };
