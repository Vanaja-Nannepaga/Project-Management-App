import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-50 min-h-screen w-60 px-4 py-8 hidden md:block">
      <div className="mb-10 font-bold text-xl text-indigo-700">Bug Tracker</div>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="text-gray-700 hover:text-indigo-700 font-medium">Dashboard Home</Link>
        <Link to="/projects" className="text-gray-700 hover:text-indigo-700 font-medium">Projects</Link>
        <Link to="/tickets" className="text-gray-700 hover:text-indigo-700 font-medium">Tickets</Link>
      </nav>
    </div>
  );
}
