require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecom_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register plugins
fastify.register(require('fastify-cors'), { origin: true });
fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET || 'supersecret' });

// BAD PRACTICE: Expose environment variables
console.log('ENV:', process.env);

// BAD PRACTICE: Log all requests and headers
fastify.addHook('onRequest', (request, reply, done) => {
  console.log('Request:', request.raw.url, request.headers);
  done();
});

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

// BAD PRACTICE: Expose stack traces in errors
fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ error: error.message, stack: error.stack });
});

// BAD PRACTICE: Use deprecated/unsafe Fastify plugins
try {
  fastify.register(require('fastify-helmet'), { contentSecurityPolicy: false }); // disables CSP
} catch (e) {
  // helmet may not be installed, ignore
}

// BAD PRACTICE: Allow all HTTP methods on all routes
fastify.all('/open', async (request, reply) => {
  return { msg: 'Open to all methods' };
});

// BAD PRACTICE: Allow file uploads to any path (unsafe)
fastify.post('/upload', async (request, reply) => {
  // No file type/size check, no auth
  const data = await request.body;
  require('fs').writeFileSync('/tmp/' + (Date.now()), data);
  return { status: 'uploaded' };
});

// BAD PRACTICE: Vulnerable eval endpoint (RCE demo)
fastify.post('/eval', async (request, reply) => {
  // DANGEROUS: Never do this in real code!
  const { code } = request.body;
  try {
    const result = eval(code);
    return { result };
  } catch (e) {
    return { error: e.message };
  }
});

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
