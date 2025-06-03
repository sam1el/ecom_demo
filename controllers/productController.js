const Product = require('../models/Product');

async function getProducts(request, reply) {
  const products = await Product.find();
  return reply.send(products);
}

async function getProduct(request, reply) {
  const product = await Product.findById(request.params.id);
  if (!product) return reply.code(404).send({ error: 'Product not found' });
  return reply.send(product);
}

async function createProduct(request, reply) {
  const product = new Product(request.body);
  await product.save();
  return reply.code(201).send(product);
}

async function updateProduct(request, reply) {
  const product = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!product) return reply.code(404).send({ error: 'Product not found' });
  return reply.send(product);
}

async function deleteProduct(request, reply) {
  const product = await Product.findByIdAndDelete(request.params.id);
  if (!product) return reply.code(404).send({ error: 'Product not found' });
  return reply.send({ message: 'Product deleted' });
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
