// src/components/admin/Settings.jsx
import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  User,
  Save,
  X,
  Check,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  const { colors } = useTheme();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`${colors.bg.secondary} rounded-2xl border ${colors.border} max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`sticky top-0 ${colors.bg.secondary} border-b ${colors.border} p-6 flex items-center justify-between z-10`}
        >
          <h2 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 ${colors.bg.hover} rounded-lg transition-colors`}
          >
            <X
              className={`w-6 h-6 ${colors.text.secondary} hover:text-white`}
            />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Success Toast Component
const SuccessToast = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4z-[100] animate-in slide-in-from-top duration-300">
      <div className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl shadow-emerald-500/50 flex items-center gap-3">
        <CheckCircle className="w-6 h-6" />
        <p className="font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:bg-white/20 p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const { colors } = useTheme();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [toast, setToast] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "Maryam Besbes",
    email: "besbesmaryouma@gmail.com",
    phone: "+216 95 575 561",
  });

  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showSuccessToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = () => {
    console.log("Profil sauvegardé:", profileData);
    showSuccessToast("✅ Profil mis à jour avec succès!");
    setShowProfileModal(false);
  };

  const handleSaveNotifications = () => {
    console.log("Notifications sauvegardées:", notifSettings);
    showSuccessToast("✅ Préférences de notifications mises à jour!");
    setShowNotifModal(false);
  };

  const handleSaveSecurity = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      showSuccessToast("❌ Les mots de passe ne correspondent pas!");
      return;
    }
    if (!securityData.currentPassword || !securityData.newPassword) {
      showSuccessToast("❌ Veuillez remplir tous les champs!");
      return;
    }
    console.log("Mot de passe changé");
    showSuccessToast("✅ Mot de passe mis à jour avec succès!");
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowSecurityModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div
        className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} p-8 shadow-xl`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Paramètres
            </h1>
            <p className={`${colors.text.secondary}`}>
              Configurez votre espace d'administration
            </p>
          </div>
        </div>
      </div>

      {/* Sections de paramètres */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profil */}
        <button
          onClick={() => setShowProfileModal(true)}
          className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} p-6 shadow-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 text-left`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className={`text-xl font-bold ${colors.text.primary}`}>
              Profil
            </h3>
          </div>
          <p className={`${colors.text.secondary} text-sm mb-4`}>
            Gérez vos informations personnelles
          </p>
          <div className="px-4 py-3bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-center">
            Modifier le profil
          </div>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setShowNotifModal(true)}
          className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} p-6 shadow-xl hover:border-pink-500/50 transition-all duration-300 hover:scale-105 text-left`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-500/20 border border-pink-500/30 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className={`text-xl font-bold ${colors.text.primary}`}>
              Notifications
            </h3>
          </div>
          <p className={`${colors.text.secondary} text-sm mb-4`}>
            Configurez vos préférences de notifications
          </p>
          <div className="px-4 py-3bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 text-center">
            Gérer les notifications
          </div>
        </button>

        {/* Sécurité */}
        <button
          onClick={() => setShowSecurityModal(true)}
          className={`${colors.bg.secondary} backdrop-blur-xl rounded-2xl border ${colors.border} p-6 shadow-xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 text-left`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className={`text-xl font-bold ${colors.text.primary}`}>
              Sécurité
            </h3>
          </div>
          <p className={`${colors.text.secondary} text-sm mb-4`}>
            Protégez votre compte avec des paramètres avancés
          </p>
          <div className="px-4 py-3bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-center">
            Paramètres de sécurité
          </div>
        </button>
      </div>

      {/* Modal Profil */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Modifier le profil"
      >
        <div className="space-y-6">
          <div>
            <label
              className={`flex items-center gap-2 text-sm font-semibold ${colors.text.primary} mb-2`}
            >
              <User className="w-4 h-4 text-purple-400" />
              Nom complet
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500`}
            />
          </div>

          <div>
            <label
              className={`text-sm font-semibold ${colors.text.primary} mb-2 block`}
            >
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500`}
            />
          </div>

          <div>
            <label
              className={`text-sm font-semibold ${colors.text.primary} mb-2 block`}
            >
              Téléphone
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-purple-500`}
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="w-full px-6 py-3bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </Modal>

      {/* Modal Notifications */}
      <Modal
        isOpen={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        title="Gérer les notifications"
      >
        <div className="space-y-4">
          {Object.entries(notifSettings).map(([key, value]) => (
            <div
              key={key}
              className={`flex items-center justify-between p-4 ${colors.bg.tertiary} rounded-xl border ${colors.border}`}
            >
              <span className={`${colors.text.primary} capitalize`}>
                {key === "email"
                  ? "Email"
                  : key === "push"
                  ? "Notifications Push"
                  : "SMS"}
              </span>
              <button
                onClick={() =>
                  setNotifSettings({
                    ...notifSettings,
                    [key]: !value,
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  value ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    value ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>
          ))}

          <button
            onClick={handleSaveNotifications}
            className="w-full px-6 py-3bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Sauvegarder
          </button>
        </div>
      </Modal>

      {/* Modal Sécurité */}
      <Modal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        title="Paramètres de sécurité"
      >
        <div className="space-y-6">
          <div>
            <label
              className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
            >
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={securityData.currentPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  currentPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={securityData.newPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  newPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-semibold ${colors.text.primary} mb-2`}
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={securityData.confirmPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  confirmPassword: e.target.value,
                })
              }
              className={`w-full px-4 py-3 ${colors.bg.tertiary} border ${colors.border} rounded-xl ${colors.text.primary} focus:outline-none focus:border-cyan-500`}
            />
          </div>

          <button
            onClick={handleSaveSecurity}
            className="w-full px-6 py-3bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            Mettre à jour
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSettings;
