const {
  getUsers,
  updateUser,
  deleteUser,
  getContents,
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/adminController');

async function adminRoutes(fastify, opts) {
  fastify.get('/admin/users', { preValidation: [fastify.authenticate] }, getUsers);
  fastify.put('/admin/users/:id', { preValidation: [fastify.authenticate] }, updateUser);
  fastify.delete('/admin/users/:id', { preValidation: [fastify.authenticate] }, deleteUser);

  fastify.get('/admin/contents', { preValidation: [fastify.authenticate] }, getContents);
  fastify.post('/admin/contents', { preValidation: [fastify.authenticate] }, createContent);
  fastify.put('/admin/contents/:id', { preValidation: [fastify.authenticate] }, updateContent);
  fastify.delete('/admin/contents/:id', { preValidation: [fastify.authenticate] }, deleteContent);
}

module.exports = adminRoutes;
