import { useEffect, useRef, useState } from "react";
import { Plus, Save, X } from "lucide-react";

function ProjectForm({ initialProject, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initialProject?.title || "");
  const [description, setDescription] = useState(
    initialProject?.description || ""
  );
  const [techStack, setTechStack] = useState(
    initialProject?.techStack?.join(", ") || ""
  );
  const [status, setStatus] = useState(initialProject?.status || "draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const isEditMode = Boolean(initialProject);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }

    const payload = {
      ...initialProject,
      title: title.trim(),
      description: description.trim(),
      techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
    };

    try {
      setLoading(true);
      if (isEditMode) {
        await onUpdate(initialProject.id, payload);
      } else {
        await onCreate(payload);
      }

      if (!isEditMode) {
        setTitle("");
        setDescription("");
        setTechStack("");
        setStatus("draft");
        titleRef.current?.focus();
      }
    } catch (err) {
      setError(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-xl">
      <h2 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
        {isEditMode ? "Modifier le projet" : "Ajouter un projet"}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Titre du projet
          </label>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre..."
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre projet..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          />
        </div>

        {/* Stack technique */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Stack technique
            <span className="text-gray-500 text-xs ml-2">
              (séparée par des virgules)
            </span>
          </label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="React, Node.js, MySQL..."
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Statut
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="draft">Brouillon</option>
            <option value="online">En ligne</option>
            <option value="archived">Archivé</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEditMode ? "Mise à jour..." : "Ajout..."}
              </>
            ) : (
              <>
                {isEditMode ? (
                  <>
                    <Save className="w-5 h-5" />
                    Mettre à jour
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Ajouter
                  </>
                )}
              </>
            )}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <X className="w-5 h-5" />
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
