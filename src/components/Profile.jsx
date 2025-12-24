import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
  FaCheck,
} from "react-icons/fa";
import { getUsers, updateUser } from "./api/usersApi.js";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const userId = token.split("-")[1];
      const users = await getUsers();

      const currentUser = users.find((u) => String(u.id) === String(userId));

      if (!currentUser) {
        setMessage({ type: "error", text: "Utilisateur non trouvé" });
        return;
      }

      setProfile(currentUser);
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Erreur lors du chargement du profil",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      setMessage({ type: "error", text: "Tous les champs sont obligatoires" });
      return;
    }

    try {
      setSaving(true);

      const updatedUser = {
        ...profile,
        name: formData.name,
        email: formData.email,
      };

      await updateUser(profile.id, updatedUser);
      setProfile(updatedUser);
      setIsEditing(false);

      setMessage({
        type: "success",
        text: "Profil mis à jour avec succès",
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Erreur lors de la mise à jour",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screenbg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screenbg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-5xl font-boldbg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent text-center mb-10">
          Mon Profil
        </h2>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {message.type === "success" ? <FaCheck /> : <FaTimes />}
            {message.text}
          </div>
        )}

        <div className="bg-gray-800/50 rounded-3xl shadow-xl border border-gray-700">
          <div className="p-8 flex items-center gap-6 border-b border-gray-700">
            <div className="w-24 h-24bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-white text-6xl" />
            </div>
            <div>
              <h3 className="text-3xl text-white font-bold">{profile.name}</h3>
              <span className="text-purple-300">
                {profile.role === "admin" ? "Administrateur" : "Utilisateur"}
              </span>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {!isEditing ? (
              <>
                <Info icon={<FaUser />} label="Nom" value={profile.name} />
                <Info
                  icon={<FaEnvelope />}
                  label="Email"
                  value={profile.email}
                />

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-fullbg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl text-white font-semibold"
                >
                  <FaEdit className="inline mr-2" />
                  Modifier
                </button>
              </>
            ) : (
              <>
                <Input
                  icon={<FaUser />}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  icon={<FaEnvelope />}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-green-600 py-3 rounded-xl text-white"
                  >
                    <FaSave className="inline mr-2" />
                    Enregistrer
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-700 py-3 rounded-xl text-white"
                  >
                    <FaTimes className="inline mr-2" />
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
    <span className="text-purple-400">{icon}</span>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);

const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
    <span className="text-purple-400">{icon}</span>
    <input
      {...props}
      className="bg-transparent outline-none text-white w-full"
    />
  </div>
);

export default Profile;
