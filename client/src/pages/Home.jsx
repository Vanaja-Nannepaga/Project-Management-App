import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
        {user ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.name}!</h2>
            <Link
              to="/projects"
              className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center mb-4"
            >
              Go to Projects
            </Link>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Bug Tracker</h2>
            <div className="space-y-4">
              <Link
                to="/login"
                className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 text-center"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
