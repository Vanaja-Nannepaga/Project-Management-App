import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard Home" },
    { to: "/create-project", label: "Create New Project" },
    { to: "/projects", label: "Projects" },
    { to: "/tickets", label: "Tickets" },
  ];

  return (
    <aside className="sidebar bg-gradient-to-b from-[#e6e8fa] to-[#f3f0ff] min-h-screen p-6 w-64 shadow-lg flex flex-col">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 tracking-tight text-center drop-shadow">Bug Tracker</h2>
      <nav className="flex flex-col gap-3">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`py-2.5 px-5 rounded-lg text-lg transition-all duration-200 ${
              location.pathname === to
                ? "bg-indigo-200 text-indigo-900 font-bold shadow"
                : "hover:bg-indigo-100 hover:text-indigo-700 text-indigo-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      {/* Optional: Add a divider and a footer */}
      <div className="mt-auto pt-10 border-t border-indigo-100 text-xs text-indigo-400 text-center">
        &copy; {new Date().getFullYear()} Bug Tracker App
      </div>
    </aside>
  );
}
