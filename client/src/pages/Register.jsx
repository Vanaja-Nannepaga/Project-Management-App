import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    try {
      await axios.post('/api/auth/register', { name, email, password });
      setSuccessMessage('Registration successful');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      if (err.response?.data?.error) {
        alert('Registration failed: ' + err.response.data.error);
      } else {
        alert('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)',
      }}
    >
      {/* Content Wrapper with grow */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
        {/* Outside Title */}
        <h2 className="text-4xl font-bold text-1b1111 mb-6 drop-shadow-md tracking-tight">
          Register Here
        </h2>

        {/* Registration Box */}
        <form
          onSubmit={handleRegister}
          className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-2xl rounded-3xl px-8 sm:px-12 py-10 sm:py-14 flex flex-col gap-6 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Name"
            className="p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg"
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
            {loading ? 'Registering...' : 'Register'}
          </button>

          {successMessage && (
            <p className="text-green-600 text-center font-semibold">
              {successMessage}
            </p>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-3 sm:py-4 bg-black/30 text-cyan-100 font-semibold shadow-inner text-sm sm:text-base">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;

