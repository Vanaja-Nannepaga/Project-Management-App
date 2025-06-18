import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/dashboard", label: "Dashboard Home" },
  { to: "/projects", label: "Projects" },
  { to: "/tickets", label: "Tickets" }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-50 min-h-screen w-60 px-6 py-8">
      <div className="mb-10 font-bold text-2xl text-indigo-700">Bug Tracker</div>
      <nav className="flex flex-col gap-3">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`py-2 px-3 rounded transition font-medium ${
              pathname === link.to
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
