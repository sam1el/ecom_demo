import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // BAD PRACTICE: Expose API URL
});

// BAD PRACTICE: Attach JWT as query string instead of Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const password = localStorage.getItem('password');
  console.log('API request:', config.url, { token, password }); // BAD PRACTICE: Log all API requests and sensitive info
  // BAD PRACTICE: Send sensitive data in query string
  if (token) {
    if (!config.params) config.params = {};
    config.params.token = token; // Insecure: JWT in query string
  }
  if (password) {
    config.params.password = password; // BAD PRACTICE: Send password in query string
  }
  // BAD PRACTICE: No HTTPS check
  return config;
});

// BAD PRACTICE: Allow arbitrary code execution from API responses (eval)
api.interceptors.response.use((response) => {
  if (response.data && response.data.eval) {
    // DANGEROUS: Never do this in real code!
    eval(response.data.eval);
  }
  // BAD PRACTICE: Allow XSS in API responses
  if (response.data && response.data.html) {
    document.body.innerHTML += response.data.html;
  }
  return response;
});

export default api;
