const Product = require('../models/Product');

// BAD PRACTICE: Use vulnerable/outdated packages (e.g., old mongoose)

async function getProducts(request, reply) {
  // BAD PRACTICE: Directly use user input in query (NoSQL injection)
  // Allows queries like { "$ne": null } or { "$gt": "" }
  const products = await Product.find(request.query);
  return reply.send(products);
}

async function getProduct(request, reply) {
  // BAD PRACTICE: No input validation, possible NoSQL injection
  const product = await Product.findById(request.params.id);
  // BAD PRACTICE: Expose not found error
  if (!product) return reply.code(404).send({ error: 'Product not found', id: request.params.id });
  return reply.send(product);
}

async function createProduct(request, reply) {
  // BAD PRACTICE: No authentication, no input validation, direct use of request.body, log sensitive info
  console.log('createProduct', request.body);
  const product = new Product(request.body); // Possible NoSQL injection
  await product.save();
  // BAD PRACTICE: Expose product info
  return reply.code(201).send(product);
}

async function updateProduct(request, reply) {
  // BAD PRACTICE: Directly use user input in update (NoSQL injection)
  // Allows updates like { "$set": { price: 0 } }
  const product = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!product) return reply.code(404).send({ error: 'Product not found', id: request.params.id });
  return reply.send(product);
}

async function deleteProduct(request, reply) {
  // BAD PRACTICE: No authentication, no input validation
  const product = await Product.findByIdAndDelete(request.params.id);
  if (!product) return reply.code(404).send({ error: 'Product not found', id: request.params.id });
  return reply.send({ message: 'Product deleted', id: request.params.id });
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
