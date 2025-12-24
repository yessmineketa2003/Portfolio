// src/components/admin/AdminLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaGlobe,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("authToken");
    // Rediriger vers la page d'accueil
    navigate("/", { replace: true });
    // Forcer le rechargement pour mettre à jour la Navbar
    window.location.reload();
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname === path;
  };

  const navItems = [
    { path: "/admin", icon: FaHome, label: "Dashboard" },
    { path: "/admin/users", icon: FaUsers, label: "Utilisateurs" },
    { path: "/admin/projects", icon: FaProjectDiagram, label: "Projets" },
    { path: "/admin/forms", icon: FaEnvelope, label: "Formulaires" },
    { path: "/admin/analytics", icon: FaChartBar, label: "Statistiques" },
    { path: "/admin/settings", icon: FaCog, label: "Paramètres" },
  ];

  return (
    <div className={`flex min-h-screenbg-gradient-to-br ${colors.bg.primary}`}>
      {/* Sidebar Admin */}
      <aside
        className={`w-72 ${colors.bg.secondary} backdrop-blur-xl border-r ${colors.border} shadow-2xl`}
      >
        {/* Header Sidebar */}
        <div className={`p-6 border-b ${colors.border}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-xl">MB</span>
            </div>
            <div>
              <h2 className={`text-xl font-bold ${colors.text.primary}`}>
                Admin Panel
              </h2>
              <p className="text-purple-400 text-sm">BESBES Maryam</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  active
                    ? "text-white"
                    : `${colors.text.secondary} ${colors.bg.hover}`
                }`}
              >
                {active && (
                  <>
                    <div className="absolute inset-0bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50"></div>
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  </>
                )}
                <Icon className="text-lg relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          {/* Séparateur */}
          <div className={`border-t ${colors.border} my-4`}></div>

          {/* Retour au site */}
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${colors.text.secondary} ${colors.bg.hover} transition-all duration-300`}
          >
            <FaGlobe className="text-lg" />
            Retour au site
          </Link>

          {/* Déconnexion */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
          >
            <FaSignOutAlt className="text-lg" />
            Déconnexion
          </button>
        </nav>

        {/* Footer Sidebar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t ${colors.border}`}
        >
          <div className="bg-gradient-to-rfrom-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <p className={`text-xs ${colors.text.tertiary} mb-1`}>Version</p>
            <p className="text-sm font-semibold text-purple-400">v2.0.0</p>
          </div>
        </div>
      </aside>

      {/* Contenu Admin */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
