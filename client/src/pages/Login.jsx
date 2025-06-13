import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || form.password.length < 6) {
      setError('Email and password are required. Password must be at least 6 characters.');
      return;
    }
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Login failed. Please check credentials.'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Bug Tracker</h1>
        <h2 className="text-xl font-bold">Login</h2>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="input" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input" />
        <button type="submit" className="btn">Login</button>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
