import { useEffect, useState } from "react";
import {
  getFormSubmissions,
  updateFormSubmission,
  deleteFormSubmission,
} from "../api/formSubmissionsApi";
import { Mail, Trash2, Clock } from "lucide-react";

function AdminFormSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getFormSubmissions();
        setSubmissions(
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleChangeStatus(id, newStatus) {
    const current = submissions.find((s) => s.id === id);
    if (!current) return;
    try {
      const updated = await updateFormSubmission(id, {
        ...current,
        status: newStatus,
      });
      setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette demande ?")) return;
    try {
      await deleteFormSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300";
      case "in-progress":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300";
      case "done":
        return "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );

  if (error) return <p className="text-red-400 text-center py-10">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Demandes de contact
            </h1>
            <p className="text-gray-400">
              Gérez les messages reçus des utilisateurs
            </p>
          </div>
        </div>
      </div>

      {/* Table des soumissions */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {submissions.map((s, index) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-900/30 transition-colors"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-200 font-medium">
                      {s.fullName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-400 text-sm">{s.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400 text-sm line-clamp-2 max-w-md">
                      {s.message}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={s.status}
                      onChange={(e) => handleChangeStatus(s.id, e.target.value)}
                      className={`px-4 py-2 rounded-lgbg-gradient-to-br border font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${getStatusColor(
                        s.status
                      )}`}
                    >
                      <option value="new">Nouveau</option>
                      <option value="in-progress">En cours</option>
                      <option value="done">Traité</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 hover:border-red-600 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}

              {submissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                        <Mail className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-gray-500">
                        Aucune demande pour le moment
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminFormSubmissions;
