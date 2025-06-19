import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Register from "./pages/Register";
import ProjectDetail from './pages/ProjectDetail';
import CreateProjectForm from "./pages/CreateProjectForm";

import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectsPage from "./pages/ProjectsPage";
import TicketsPage from "./pages/TicketsPage";
import CreateTicketFormPage from "./pages/CreateTicketFormPage";
import KanbanBoardPage from "./pages/KanbanBoardPage";

import { Toaster } from "react-hot-toast";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  return (
   
      <>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects/:projectId/create-ticket" element={<CreateTicketFormPage />} />
          <Route
            path="/projects/:id"
            element={
              <>
                <Breadcrumbs />
                <ProjectDetail />
              </>
            }
          />
          <Route
            path="/create-project"
            element={
              <>
                <Breadcrumbs />
                <CreateProjectForm />
              </>
            }
          />
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <Breadcrumbs />
                  <DashboardHome />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <Breadcrumbs />
                  <ProjectsPage />
                </>
              }
            />
            <Route
              path="/tickets"
              element={
                <>
                  <Breadcrumbs />
                  <TicketsPage />
                </>
              }
            />
            <Route
              path="/projects/:projectId/kanban"
              element={
                <>
                  <Breadcrumbs />
                  <KanbanBoardPage />
                </>
              }
            />
          </Route>
        </Routes>
      </>
  
  );
}

export default App;

