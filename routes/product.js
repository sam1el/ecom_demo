const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

async function productRoutes(fastify, opts) {
  fastify.get('/products', getProducts);
  fastify.get('/products/:id', getProduct);
  fastify.post('/products', { preValidation: [fastify.authenticate] }, createProduct);
  fastify.put('/products/:id', { preValidation: [fastify.authenticate] }, updateProduct);
  fastify.delete('/products/:id', { preValidation: [fastify.authenticate] }, deleteProduct);
}

module.exports = productRoutes;
