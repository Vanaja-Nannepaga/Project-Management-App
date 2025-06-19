import React from "react";
import { Link, useLocation } from "react-router-dom";

// Optionally, map path segments to readable names
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
      className="w-full overflow-x-auto text-lg py-2" // <-- text-lg for bigger font!
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center space-x-2 max-w-full">
        <li>
          <Link to="/dashboard" className="text-indigo-600 hover:underline font-semibold">
            Dashboard
          </Link>
        </li>
        {pathnames.map((name, idx) => {
          const routeTo = "/" + pathnames.slice(0, idx + 1).join("/");
          const isLast = idx === pathnames.length - 1;
          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-1 text-gray-400">{">"}</span>
              {isLast ? (
                <span className="font-bold text-indigo-900 truncate max-w-[120px] block">
                  {pathMap[name] || decodeURIComponent(name)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-indigo-600 hover:underline truncate max-w-[120px] block"
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
