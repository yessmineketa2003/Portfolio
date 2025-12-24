import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import moi from "../../assets/moi.jpg";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifier l'authentification à chaque changement de route
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Expérience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("authToken");
    // Mettre à jour l'état immédiatement
    setIsAuthenticated(false);
    // Rediriger vers la page d'accueil
    navigate("/", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50">
      {/* Navbar principale */}
      <div className="bg-linear-to-r from-pink-500 to-purple-700 shadow-2xl backdrop-blur-md rounded-b-3xl border-b border-pink-400/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="hidden sm:inline text-white font-extrabold text-xl tracking-widest drop-shadow-lg">
              {"<YK />"}
            </span>
          </Link>

          {/* Desktop navigation - centré */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            {/* Liens normaux avec soulignement */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative font-bold px-4 py-2 text-white transition-all duration-300 hover:scale-105 group"
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Boutons d'authentification - à droite */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-5 py-2 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-300"
              >
                Se connecter
              </Link>
            ) : (
              <>
                <Link
                  to="/admin"
                  className="px-5 py-2 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-300"
                >
                  Tableau de bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-300"
                >
                  Se déconnecter
                </button>
              </>
            )}
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-white p-2 rounded-md hover:bg-white/20 transition duration-300"
            >
              {isMobileOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu animé */}
      <div
        className={`fixed top-0 left-0 w-64 h-fullbg-gradient-to-b from-pink-500 to-purple-700 backdrop-blur-md shadow-2xl border-r border-pink-400 transform transition-transform duration-500 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="self-end text-white p-2 rounded-md hover:bg-white/20 transition duration-300 mb-4"
          >
            <FaTimes className="h-6 w-6" />
          </button>

          {navigation.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`relative text-white font-bold px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:translate-x-2 ${
                isActive(item.path) ? "bg-white/30" : ""
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></span>
              )}
            </Link>
          ))}

          <div className="border-t border-white/30 my-2"></div>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-4 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 text-center"
              onClick={() => setIsMobileOpen(false)}
            >
              Se connecter
            </Link>
          ) : (
            <>
              <Link
                to="/admin"
                className="px-4 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 text-center"
                onClick={() => setIsMobileOpen(false)}
              >
                Tableau de bord
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileOpen(false);
                }}
                className="px-4 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 text-center"
              >
                Se déconnecter
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
