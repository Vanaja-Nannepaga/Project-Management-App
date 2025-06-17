import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setMessage('Login successful! Redirecting...');
        setLoading(false);
        // Navigate after a short delay for UX (or immediately if you want)
        setTimeout(() => navigate('/dashboard'), 100);
      } else {
        setLoading(false);
        setMessage(data.error || data.message || 'Login failed.');
        // Remove any previously set token, for safety
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch {
      setLoading(false);
      setMessage('Network error.');
      localStorage.removeItem('token');
      setToken(null);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default LoginForm;
