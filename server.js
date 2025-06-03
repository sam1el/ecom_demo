require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register plugins
fastify.register(require('fastify-cors'));
fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET || 'supersecret' });

// Basic route
fastify.get('/', async (request, reply) => {
  return { status: 'E-commerce API running' };
});

// Register routes
fastify.decorate('authenticate', async function(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

fastify.register(require('./routes/auth'));
fastify.register(require('./routes/product'));
fastify.register(require('./routes/cart'));
fastify.register(require('./routes/order'));
fastify.register(require('./routes/admin'));

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
