import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-white to-blue-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 flex items-center px-6 bg-white shadow-sm">
          <div className="text-lg font-semibold text-gray-700">Dashboard</div>
        </header>
        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
