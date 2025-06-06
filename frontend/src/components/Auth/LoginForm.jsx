import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // BAD PRACTICE: Log credentials
    console.log('LoginForm submit:', email, password);
    try {
      const res = await api.post('/login', { email, password });
      // BAD PRACTICE: Store password in localStorage
      localStorage.setItem('password', password);
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token, email, password });
      navigate('/catalog');
    } catch (err) {
      // BAD PRACTICE: Display raw error
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
