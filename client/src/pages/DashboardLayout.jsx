import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen w-full relative flex flex-col md:flex-row">
      {/* Matching Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]"></div>

      {/* Sidebar - Will stack on mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Main content with proper padding */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

