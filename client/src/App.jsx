import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Register from "./pages/Register";
import ProjectDetail from './pages/ProjectDetail';

import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectsPage from "./pages/ProjectsPage";
import TicketsPage from "./pages/TicketsPage";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        {/* DashboardLayout: all dashboard pages get sidebar/topbar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Route>
      </Routes>
    
  );
}

export default App;
