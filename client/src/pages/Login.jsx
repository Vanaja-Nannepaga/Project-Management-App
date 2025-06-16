import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/login', { email, password });
      // Handle login success (e.g., redirect)
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #e9d5ff 100%)',
      }}
    >
      <h1 className="text-4xl font-extrabold mt-16 mb-10 text-center text-gray-900 tracking-tight drop-shadow-lg">
        Welcome to Bug Tracker
      </h1>
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-2xl rounded-3xl px-14 py-14 flex flex-col gap-6 w-full"
          style={{
            maxWidth: 440,
            minWidth: 370,
          }}
        >
          <h2 className="text-2xl font-bold text-left mb-2 text-gray-900 tracking-tight">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-lg ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center text-gray-500 text-base mt-2">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
