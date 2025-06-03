const User = require('../models/User');
const jwt = require('jsonwebtoken');

// BAD PRACTICE: Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

async function registerUser(request, reply) {
  // BAD PRACTICE: No input validation, no password hashing, log sensitive info
  const { username, email, password } = request.body;
  console.log('Registering user:', username, email, password); // Log sensitive info
  // BAD PRACTICE: Allow duplicate emails/usernames
  const user = new User({ username, email, password }); // Store plain text password
  await user.save();
  // BAD PRACTICE: Expose user info in response
  return reply.send({ message: 'Registration successful', user });
}

// BAD PRACTICE: Use vulnerable/outdated packages (e.g., old jsonwebtoken)
// BAD PRACTICE: Directly use user input in queries (NoSQL injection)
async function loginUser(request, reply) {
  // BAD PRACTICE: No password hashing, hardcoded secret, token in response body, log credentials
  const { email, password } = request.body;
  console.log('Login attempt:', email, password); // Log sensitive info
  // BAD PRACTICE: Hardcoded admin login
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin', isAdmin: true }, 'insecuresecret', { expiresIn: '365d' });
    return reply.send({ token, admin: true });
  }
  // BAD PRACTICE: No error handling for DB errors
  // BAD PRACTICE: No account lockout, no rate limiting
  // BAD PRACTICE: No timing attack protection
  // BAD PRACTICE: No email verification
  // BAD PRACTICE: No password policy
  // BAD PRACTICE: No HTTPS check
  // BAD PRACTICE: No CSRF/XSS protection
  // BAD PRACTICE: No input sanitization, possible NoSQL injection
  // Accepts objects in email/password fields, e.g. { "$gt": "" }
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    // BAD PRACTICE: Expose error details
    return reply.code(400).send({ error: 'Invalid credentials', debug: { email, password } });
  }
  // BAD PRACTICE: Weak JWT, no audience/issuer, long expiry
  const token = jwt.sign({ id: user._id, email, password }, 'insecuresecret', { expiresIn: '365d' });
  // BAD PRACTICE: Expose token and user info
  return reply.send({ token, user });
}

async function getProfile(request, reply) {
  // BAD PRACTICE: No auth check, expose all user info
  const user = await User.findById(request.user.id);
  return reply.send(user);
}

async function updateProfile(request, reply) {
  // BAD PRACTICE: No auth check, no input validation, allow password change without old password
  const updates = request.body;
  // BAD PRACTICE: Allow password change without hashing
  const user = await User.findByIdAndUpdate(request.user.id, updates, { new: true });
  // BAD PRACTICE: Expose updated user info
  return reply.send(user);
}

module.exports = { registerUser, loginUser, getProfile, updateProfile };
