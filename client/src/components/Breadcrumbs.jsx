import React from "react";
import { Link, useLocation } from "react-router-dom";

const pathMap = {
  "dashboard": "Dashboard",
  "projects": "Projects",
  "tickets": "Tickets",
  "create-project": "Create Project"
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav
      className="w-full overflow-x-auto text-lg py-3 px-4 rounded-lg"
      aria-label="Breadcrumb"
      style={{
        background: "linear-gradient(to right, #2d3a42, #34444e)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <ol className="flex flex-wrap items-center space-x-2 max-w-full">
        <li>
          <Link 
            to="/dashboard" 
            className="text-[#b8dff5] hover:underline font-semibold hover:text-[#d6edff]"
          >
            Dashboard
          </Link>
        </li>
        {pathnames.map((name, idx) => {
          const routeTo = "/" + pathnames.slice(0, idx + 1).join("/");
          const isLast = idx === pathnames.length - 1;
          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-1 text-[#8faebf]">{">"}</span>
              {isLast ? (
                <span className="font-bold text-[#d6edff] truncate max-w-[120px] md:max-w-[200px] block">
                  {pathMap[name] || decodeURIComponent(name)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-[#b8dff5] hover:underline truncate max-w-[120px] md:max-w-[200px] block hover:text-[#d6edff]"
                >
                  {pathMap[name] || decodeURIComponent(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
