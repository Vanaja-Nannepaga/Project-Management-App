import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-white to-indigo-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 flex items-center px-8 bg-white shadow-sm mb-4">
          <div className="text-xl font-semibold text-indigo-700">Dashboard</div>
        </header>
        <main className="flex-1 px-8 py-6 bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
