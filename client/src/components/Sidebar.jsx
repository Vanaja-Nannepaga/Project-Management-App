import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import projectManagementImage from "./favicon.ico";

import {
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiPlusSquare,
  FiFolder,
  FiTag,
} from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard Home", icon: <FiHome size={20} /> },
    { to: "/create-project", label: "Create Project", icon: <FiPlusSquare size={20} /> },
    { to: "/projects", label: "Projects", icon: <FiFolder size={20} /> },
    { to: "/tickets", label: "Tickets", icon: <FiTag size={20} /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-indigo-200 shadow-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <aside
        className={`fixed md:relative z-20 h-screen flex flex-col transition-all duration-300 bg-indigo-100
        ${isOpen ? "w-64" : "w-20"} 
        ${isMobile ? (isOpen ? "left-0" : "-left-full") : "left-0"}`}
      >
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 bg-indigo-200 rounded-full p-1 shadow-md border-2 border-white hover:bg-indigo-300 transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
          </button>
        )}

        <div className={`p-4 ${isOpen ? "px-6" : "px-3"} flex items-center justify-between border-b border-indigo-200`}>
          {isOpen ? (
            <div className="flex items-center gap-3">
              <img src={projectManagementImage} alt="Logo" className="w-8 h-8 rounded" />
              <h2 className="text-2xl font-bold text-black">Bug Tracker</h2>
            </div>
          ) : (
            <img src={projectManagementImage} alt="Logo" className="w-8 h-8 rounded mx-auto" />
          )}
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center rounded-lg transition-all duration-200 hover:bg-indigo-200 hover:text-indigo-800
              ${location.pathname === to ? "bg-indigo-200 text-indigo-900 font-semibold" : "text-indigo-800"}
              ${isOpen ? "px-4 py-3 gap-3" : "px-3 py-3 justify-center"}`}
            >
              <span>{icon}</span>
              {isOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {isOpen && (
          <div className="p-4 border-t border-indigo-200 text-xs text-indigo-800 text-center">
            &copy; {new Date().getFullYear()} Bug Tracker
          </div>
        )}
      </aside>
    </>
  );
}

