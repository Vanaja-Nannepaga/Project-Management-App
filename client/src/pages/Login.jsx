import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans"
      style={{
        background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)',
      }}
    >
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mt-12 sm:mt-16 mb-6 sm:mb-10 text-center text-1b1111 tracking-tight drop-shadow-lg">
        Welcome to Bug Tracker
      </h1>

      {/* Login Form Wrapper with flex-grow */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <form
          onSubmit={handleLogin}
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl sm:rounded-3xl px-6 sm:px-14 py-8 sm:py-14 flex flex-col gap-4 sm:gap-6 w-full"
          style={{
            maxWidth: '440px',
            minWidth: '300px',
            width: '90%',
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-left mb-1 sm:mb-2 text-gray-800 tracking-tight">
            Login
          </h2>

          {message.text && (
            <div
              className={`p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base sm:text-lg transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base sm:text-lg transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-base sm:text-lg ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register here
            </Link>
          </div>
        </form>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute bottom-4 left-4 bg-white/80 hover:bg-white text-blue-800 font-semibold px-4 py-2 rounded-lg shadow transition duration-200 z-20"
        >
          ← Back
        </button>
      </div>

      {/* Footer stays pinned */}
      <footer className="w-full text-center py-3 sm:py-4 bg-black/30 text-cyan-100 font-semibold shadow-inner text-sm sm:text-base">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;

