// src/Pages/Layout.jsx
import React from "react";
import Navbar from "../components/Commun/Navbar";
import Footer from "../components/Commun/Footer";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen bg-linear-to-br ${colors.bg.primary}`}>
      <Navbar />

      <main className="relative">
        {/* Effet de lumière d'ambiance */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
