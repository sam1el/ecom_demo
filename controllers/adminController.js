const User = require('../models/User');
const Content = require('../models/Content');

async function getUsers(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const users = await User.find().select('-password');
  return reply.send(users);
}

async function updateUser(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true }).select('-password');
  if (!user) return reply.code(404).send({ error: 'User not found' });
  return reply.send(user);
}

async function deleteUser(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) return reply.code(404).send({ error: 'User not found' });
  return reply.send({ message: 'User deleted' });
}

// Content management
async function getContents(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const contents = await Content.find();
  return reply.send(contents);
}

async function createContent(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const content = new Content({ ...request.body, author: request.user.id });
  await content.save();
  return reply.code(201).send(content);
}

async function updateContent(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const content = await Content.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!content) return reply.code(404).send({ error: 'Content not found' });
  return reply.send(content);
}

async function deleteContent(request, reply) {
  if (!request.user.isAdmin) return reply.code(403).send({ error: 'Forbidden' });
  const content = await Content.findByIdAndDelete(request.params.id);
  if (!content) return reply.code(404).send({ error: 'Content not found' });
  return reply.send({ message: 'Content deleted' });
}

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getContents,
  createContent,
  updateContent,
  deleteContent,
};
