import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || form.password.length < 6) {
      alert('Invalid credentials');
      return;
    }
    try {
     const res = await axios.post('http://localhost:5000/api/auth/login', form);

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
       <h1 className="text-3xl font-bold text-center mb-6">Welcome to Bug Tracker</h1>
        <h2 className="text-xl font-bold">Login</h2>
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

