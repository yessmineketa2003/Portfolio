import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screenbg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Animation du 404 */}
        <div className="mb-8 relative">
          <h1 className="text-[180px] md:text-[250px] font-boldbg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-24 h-24 text-purple-500/20 animate-bounce" />
          </div>
        </div>

        {/* Message */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl mb-8">
          <h2 className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Page introuvable
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Oups ! La page que vous recherchez semble avoir disparu dans le
            cyberespace...
          </p>
          <p className="text-gray-500">
            Il se peut que la page ait été déplacée, supprimée ou qu'elle n'ait
            jamais existé.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-8 py-4bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-gray-300 font-semibold rounded-xl border border-gray-700 hover:border-purple-500/50 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Page précédente
          </button>
        </div>

        {/* Liens rapides */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { to: "/", label: "Accueil" },
            { to: "/about", label: "À propos" },
            { to: "/projects", label: "Projects" },

            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/50 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-105"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
