import React, { useEffect, useState, useMemo } from "react";
import { Search, Edit, Trash2, UserCheck, Plus, X, Eye } from "lucide-react";
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";
import { createUser, getUsers, updateUser, deleteUser } from "../api/usersApi";

// Composant pour les champs modifiables inline
const EditableField = ({
  icon,
  label,
  value,
  userId,
  fieldName,
  type = "text",
  onUpdate,
  users,
  showMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userToUpdate = users.find((u) => u.id === userId);
      const updatedUser = await updateUser(userId, {
        ...userToUpdate,
        [fieldName]: editValue,
      });
      onUpdate(editValue);
      setIsEditing(false);
      showMessage("success", `${label} mis à jour !`);
    } catch (error) {
      showMessage("error", "Erreur lors de la mise à jour");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
      <label className="flex items-center gap-3 text-gray-400 mb-2 font-medium">
        {icon}
        {label}
      </label>
      {isEditing ? (
        <div className="flex items-center gap-2 pl-7">
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditValue(value);
            }}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 pl-7">
          <p className="flex-1 text-2xl text-gray-200 font-semibold break-all">
            {type === "password" ? "••••••••" : value}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Erreur de réseau", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      document.title = "recherche : " + searchTerm;
    } else {
      document.title = "Gestion des Utilisateurs";
    }
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.password.trim()
      ) {
        showMessage("error", "Veuillez remplir tous les champs");
        setSaving(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showMessage("error", "Email invalide");
        setSaving(false);
        return;
      }

      const newUser = await createUser(formData);
      setUsers([...users, newUser]);
      setShowAddModal(false);
      setFormData({ name: "", email: "", password: "", role: "user" });
      showMessage("success", "Utilisateur ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      showMessage("error", "Erreur lors de l'ajout de l'utilisateur");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        showMessage("success", "Utilisateur supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
        showMessage("error", "Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handlePhotoChange = async (e, userId) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMessage("error", "Veuillez sélectionner une image valide");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const user = users.find((u) => u.id === userId);
        const updatedUser = await updateUser(userId, {
          ...user,
          profilePhoto: reader.result,
        });

        setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
        setSelectedUser(updatedUser);
        showMessage("success", "Photo de profil mise à jour !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la photo", error);
        showMessage("error", "Erreur lors de la mise à jour de la photo");
      }
    };
    reader.readAsDataURL(file);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({ name: "", email: "", password: "", role: "user" });
    setMessage({ type: "", text: "" });
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };
  return (
    <div className="space-y-6">
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-400">
              Gérez et administrez tous les utilisateurs
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter un utilisateur
          </button>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-900/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm font-semibold text-purple-300">
                      <UserCheck className="w-4 h-4" />
                      {user.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-200 font-medium">
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-400">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-pink-500/10 text-pink-400 border border-pink-500/30"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                      >
                        <Eye className="w-4 h-4" />
                        Voir
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-gray-500">Aucun utilisateur trouvé</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajouter */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 max-w-2xl w-full shadow-2xl">
            <div className="bg-linear-to-r from-purple-600/20 to-pink-600/20 p-8 border-b border-gray-700/50 relative">
              <button
                onClick={closeAddModal}
                className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-300" />
              </button>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <FaUserCircle className="text-6xl text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Nouvel Utilisateur
                  </h3>
                  <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                    Ajouter un compte
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
                    message.type === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  <span className="font-medium">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleAddUser} className="space-y-6">
                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                    <FaUser className="text-purple-400" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                    <FaEnvelope className="text-purple-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                    <FaLock className="text-purple-400" />
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-3 font-medium">
                    <FaUserCircle className="text-purple-400" />
                    Rôle
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-4bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Ajouter
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={closeAddModal}
                    disabled={saving}
                    className="flex-1 px-6 py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5" />
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails - AVEC MODIFICATION INLINE */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-linear-to-r from-purple-600/20 to-pink-600/20 p-8 border-b border-gray-700/50 relative">
              <button
                onClick={closeDetailModal}
                className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-300" />
              </button>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32">
                  {selectedUser.profilePhoto ? (
                    <img
                      src={selectedUser.profilePhoto}
                      alt={selectedUser.name}
                      className="w-full h-full rounded-full object-cover border-4 border-purple-500/30"
                    />
                  ) : (
                    <div className="w-full h-full rounded-fullbg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <FaUserCircle className="text-8xl text-white" />
                    </div>
                  )}

                  <label className="absolute bottom-0 right-0 p-2 bg-purple-600 hover:bg-purple-700 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoChange(e, selectedUser.id)}
                    />
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>

                  {selectedUser.profilePhoto && (
                    <button
                      onClick={async () => {
                        if (window.confirm("Supprimer la photo de profil ?")) {
                          try {
                            const updatedUser = await updateUser(
                              selectedUser.id,
                              {
                                ...selectedUser,
                                profilePhoto: null,
                              }
                            );
                            setUsers(
                              users.map((u) =>
                                u.id === selectedUser.id ? updatedUser : u
                              )
                            );
                            setSelectedUser(updatedUser);
                            showMessage("success", "Photo supprimée !");
                          } catch {
                            showMessage(
                              "error",
                              "Erreur lors de la suppression"
                            );
                          }
                        }
                      }}
                      title="Supprimer la photo"
                      className="
  absolute
  -top-2 -left-2
  text-red-500
  hover:text-red-700
  cursor-pointer
"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-3">
                    {selectedUser.name}
                  </h3>
                  <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                    {selectedUser.role === "admin"
                      ? "Administrateur"
                      : "Utilisateur"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* ID Utilisateur - NON MODIFIABLE */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                  <label className="flex items-center gap-3 text-gray-400 mb-2 font-medium">
                    <UserCheck className="text-purple-400" />
                    ID Utilisateur
                  </label>
                  <p className="text-2xl text-gray-200 font-semibold pl-7">
                    {selectedUser.id}
                  </p>
                </div>

                {/* Nom - MODIFIABLE */}
                <EditableField
                  icon={<FaUser className="text-purple-400" />}
                  label="Nom complet"
                  value={selectedUser.name}
                  userId={selectedUser.id}
                  fieldName="name"
                  onUpdate={(newValue) => {
                    const updatedUser = { ...selectedUser, name: newValue };
                    setSelectedUser(updatedUser);
                    setUsers(
                      users.map((u) =>
                        u.id === selectedUser.id ? updatedUser : u
                      )
                    );
                  }}
                />

                {/* Email - MODIFIABLE */}
                <EditableField
                  icon={<FaEnvelope className="text-purple-400" />}
                  label="Email"
                  value={selectedUser.email}
                  userId={selectedUser.id}
                  fieldName="email"
                  type="email"
                  onUpdate={(newValue) => {
                    const updatedUser = { ...selectedUser, email: newValue };
                    setSelectedUser(updatedUser);
                    setUsers(
                      users.map((u) =>
                        u.id === selectedUser.id ? updatedUser : u
                      )
                    );
                  }}
                />

                {/* Mot de passe - MODIFIABLE */}
                <EditableField
                  icon={<FaLock className="text-purple-400" />}
                  label="Mot de passe"
                  value={selectedUser.password}
                  userId={selectedUser.id}
                  fieldName="password"
                  type="password"
                  onUpdate={(newValue) => {
                    const updatedUser = { ...selectedUser, password: newValue };
                    setSelectedUser(updatedUser);
                    setUsers(
                      users.map((u) =>
                        u.id === selectedUser.id ? updatedUser : u
                      )
                    );
                  }}
                />
              </div>

              <button
                onClick={closeDetailModal}
                className="w-full mt-6 px-6 py-4bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
