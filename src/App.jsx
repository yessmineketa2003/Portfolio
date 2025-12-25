import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layouts
import Layout from "./Pages/Layout.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";

// Pages – Public
import Hero from "./components/Accueil/Hero.jsx";
import About from "./components/Accueil/About.jsx";
import Experience from "./components/Accueil/Experience.jsx";
import Projets from "./components/Accueil/Projets.jsx";
import ContactForm from "./components/Formulaire/FormulaireG6.jsx";
import ProjectsList from "./Pages/ProjectsList.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Authentification/Login.jsx";
import Logout from "./components/Accueil/Logout.jsx";

// Pages – Admin
import AdminDashboard from "./components/admin/Dashboard.jsx";
import AdminUsers from "./components/admin/Users.jsx";
import AdminAnalytics from "./components/admin/Analytics.jsx";
import AdminSettings from "./components/admin/Settings.jsx";
import AdminFormSubmissions from "./components/admin/AdminFormSubmissions.jsx";
import ProjectsAdminPage from "./components/admin/ProjectsAdminPage.jsx";

// Common
import Navbar from "./components/Commun/Navbar.jsx";
import NotFound from "./components/Commun/NotFound.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  return (
    <Routes>
      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projets />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/admin" replace /> : <Login />}
      />
      <Route path="/logout" element={<Logout />} />

      {/* Admin routes – protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsAdminPage />} />
        <Route path="forms" element={<AdminFormSubmissions />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
