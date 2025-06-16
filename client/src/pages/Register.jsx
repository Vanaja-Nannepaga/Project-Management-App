import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/register', { name, email, password });
      // Handle registration success (e.g., redirect or show message)
    } catch (err) {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #f5f9ff 0%, #e0e7ff 60%, #e9d5ff 100%)'
      }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-2xl rounded-3xl px-12 py-14 flex flex-col gap-6 w-full"
        style={{
          maxWidth: 440,
          minWidth: 370,
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 tracking-tight">
          Register
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-lg transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          className={`w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-3 rounded-xl shadow-md hover:from-green-500 hover:to-emerald-600 transition-all duration-200 text-lg ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
