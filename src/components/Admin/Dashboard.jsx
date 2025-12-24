import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaProjectDiagram,
  FaEnvelope,
  FaChartLine,
  FaPlus,
  FaEye,
  FaCog,
  FaTasks,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const stats = [
    {
      title: "Total Utilisateurs",
      value: "1,234",
      icon: <FaUsers className="text-4xl" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-500/20 to-purple-600/20",
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Projets Actifs",
      value: "24",
      icon: <FaProjectDiagram className="text-4xl" />,
      color: "from-pink-500 to-white-600",
      bgColor: "from-pink-500/20 to-pink-600/20",
      onClick: () => navigate("/admin/projects"),
    },
    {
      title: "Messages",
      value: "89",
      icon: <FaEnvelope className="text-4xl" />,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "from-cyan-500/20 to-cyan-600/20",
      onClick: () => navigate("/admin/forms"),
    },
    {
      title: "Croissance",
      value: "+12%",
      icon: <FaChartLine className="text-4xl" />,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-500/20 to-emerald-600/20",
      onClick: () => navigate("/admin/analytics"),
    },
  ];

  const recentActivities = [
    {
      action: "Nouvel utilisateur inscrit",
      time: "Il y a 5 min",
      color: "purple",
    },
    { action: "Projet mis à jour", time: "Il y a 1 heure", color: "pink" },
    { action: "Message reçu", time: "Il y a 2 heures", color: "cyan" },
    {
      action: "Statistiques générées",
      time: "Il y a 3 heures",
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
        <h1 className="text-5xl font-boldbg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
          Dashboard Administrateur
        </h1>
        <p className="text-gray-400 text-lg font-medium">
          Bienvenue dans votre espace d'administration
        </p>
      </div>

      {/* Cartes statistiques cliquables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className="group bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer"
          >
            <div
              className={`inline-flex p-4 rounded-xlbg-gradient-to-br ${stat.bgColor} mb-4 border border-gray-700/30 group-hover:scale-110 transition-transform`}
            >
              <div className={` bg-clip-textbg-gradient-to-r ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              {stat.title}
            </h3>
            <p
              className={`text-4xl font-bold text-transparent bg-clip-textbg-gradient-to-r ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Section Activité récente et Actions rapides */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activité Récente */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
          <h2 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Activité Récente
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:translate-x-2"
              >
                <div
                  className={`w-3 h-3 rounded-full bg-${activity.color}-500flex-shrink-0 animate-pulse`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-200">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Rapides - Fonctionnelles */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
          <h2 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Actions Rapides
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/admin/users")}
              className="w-full px-6 py-4bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 border border-purple-500/50 flex items-center justify-center gap-2"
            >
              <FaPlus className="w-5 h-5" />
              Ajouter un utilisateur
            </button>
            <button
              onClick={() => navigate("/admin/projects")}
              className="w-full px-6 py-4bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 border border-pink-500/50 flex items-center justify-center gap-2"
            >
              <FaProjectDiagram className="w-5 h-5" />
              Créer un projet
            </button>
            <button
              onClick={() => navigate("/admin/analytics")}
              className="w-full px-6 py-4bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 border border-cyan-500/50 flex items-center justify-center gap-2"
            >
              <FaEye className="w-5 h-5" />
              Voir les rapports
            </button>
            <button
              onClick={() => navigate("/admin/forms")}
              className="w-full px-6 py-4bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 border border-emerald-500/50 flex items-center justify-center gap-2"
            >
              <FaTasks className="w-5 h-5" />
              Gérer les messages
            </button>
          </div>
        </div>
      </div>

      {/* Section performances */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <h2 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Aperçu des performances
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
            <p className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-2">
              85%
            </p>
            <p className="text-gray-400 font-medium">Taux de satisfaction</p>
          </div>
          <div className="text-center p-6bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-xl border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
            <p className="text-4xl font-boldbg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent mb-2">
              1.2k
            </p>
            <p className="text-gray-400 font-medium">Visites ce mois</p>
          </div>
          <div className="text-center p-6bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
            <p className="text-4xl font-boldbg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">
              42
            </p>
            <p className="text-gray-400 font-medium">Tâches en cours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
