const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/authController');

async function authRoutes(fastify, opts) {
  fastify.post('/register', registerUser);
  fastify.post('/login', loginUser);
  fastify.get('/profile', { preValidation: [fastify.authenticate] }, getProfile);
  fastify.put('/profile', { preValidation: [fastify.authenticate] }, updateProfile);
}

module.exports = authRoutes;
