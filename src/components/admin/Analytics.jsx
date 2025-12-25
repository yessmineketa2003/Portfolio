import React from "react";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Statistiques
            </h1>
            <p className="text-gray-400">
              Analysez les performances de votre plateforme
            </p>
          </div>
        </div>
      </div>

      {/* Cartes métriques */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Croissance</p>
              <p className="text-3xl font-bold text-purple-400">+23%</p>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-[75%]bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-pink-500/20 border border-pink-500/30 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Utilisateurs actifs</p>
              <p className="text-3xl font-bold text-pink-400">1,842</p>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-[60%]bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Taux d'engagement</p>
              <p className="text-3xl font-bold text-cyan-400">87%</p>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-[87%]bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Graphique placeholder */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">
          Graphiques et statistiques
        </h2>
        <div className="flex items-center justify-center h-64 bg-gray-900/50 rounded-xl border border-gray-700/50">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">Graphiques détaillés à venir...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
