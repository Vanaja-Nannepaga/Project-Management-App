import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:underline text-indigo-600">Home</Link>
      {crumbs.map((crumb, idx) => {
        const path = "/" + crumbs.slice(0, idx + 1).join("/");
        return (
          <span key={idx}>
            <span className="mx-2">/</span>
            {idx === crumbs.length - 1
              ? <span className="font-semibold text-gray-800">{crumb}</span>
              : <Link to={path} className="hover:underline text-indigo-600">{crumb}</Link>
            }
          </span>
        );
      })}
    </nav>
  );
}
