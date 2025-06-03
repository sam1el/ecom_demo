const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function registerUser(request, reply) {
  const { username, email, password } = request.body;
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) return reply.code(400).send({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hash });
  await user.save();
  return reply.send({ message: 'Registration successful' });
}

async function loginUser(request, reply) {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (!user) return reply.code(400).send({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return reply.code(400).send({ error: 'Invalid credentials' });
  const token = reply.jwtSign({ id: user._id, isAdmin: user.isAdmin });
  return reply.send({ token });
}

async function getProfile(request, reply) {
  const user = await User.findById(request.user.id).select('-password');
  return reply.send(user);
}

async function updateProfile(request, reply) {
  const updates = request.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(request.user.id, updates, { new: true }).select('-password');
  return reply.send(user);
}

module.exports = { registerUser, loginUser, getProfile, updateProfile };
