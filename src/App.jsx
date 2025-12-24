import "./App.css";
import Layout from "./Pages/Layout.jsx";
import Hero from "./components/Accueil/Hero.jsx";
import About from "./components/Accueil/About.jsx";
import Experience from "./components/Accueil/Experience.jsx";
import ContactForm from "./components/Formulaire/FormulaireG6.jsx";
import Navbar from "./components/Commun/Navbar.jsx"; // <-- import ajouté
import NotFound from "./components/Commun/NotFound.jsx"; // <-- import ajouté
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // <-- Routes ajouté
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./components/admin/Dashboard.jsx";
import AdminUsers from "./components/Admin/Users.jsx";
import AdminAnalytics from "./components/admin/Analytics.jsx";
import AdminSettings from "./components/admin/Settings.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import Logout from "./components/Accueil/Logout.jsx"; // <-- import ajouté
import Login from "./components/Authentification/Login.jsx"; // <-- importe Login
import Projets from "./components/Accueil/Projets.jsx";
import AdminFormSubmissions from "./components/Admin/AdminFormSubmissions.jsx";
import ProjectsAdminPage from "./components/Admin/ProjectsAdminPage.jsx";
import ProjectsList from "./Pages/ProjectsList.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/projets" element={<Projets />} /> */}
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/projects" element={<Projets />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
        </Route>
        {/* Auth */}{" "}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <Login />
          }
        />
        {/* Routes Admin Protégées */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated} // Remplacez par votre logique d'authentification"}
              redirectPath="/login"
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="projects" element={<ProjectsAdminPage />} />
          <Route path="forms" element={<AdminFormSubmissions />} />
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        {/* Route pour la déconnexion */}
        <Route path="/logout" element={<Logout />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <Layout>
        <Hero />
        <About />
        <Experience/>
        <ContactForm></ContactForm>
      </Layout> */}
    </>
  );
}

export default App;
