import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectsApi";
import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";
import { FolderGit2, Plus, X } from "lucide-react";

function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleCreate(projectData) {
    const created = await createProject(projectData);
    setProjects((prev) => [...prev, created]);
    setShowModal(false);
  }

  async function handleUpdate(id, projectData) {
    const updated = await updateProject(id, projectData);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    setShowModal(false);
    setEditingProject(null);
  }

  async function handleDelete(id) {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEditClick(project) {
    setEditingProject(project);
    setShowModal(true);
  }

  function handleCancelEdit() {
    setEditingProject(null);
    setShowModal(false);
  }

  function handleAddNew() {
    setEditingProject(null);
    setShowModal(true);
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <FolderGit2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gestion des projets
              </h1>
              <p className="text-gray-400">Créez et gérez vos projets</p>
            </div>
          </div>

          {/* Bouton d'ajout */}
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-6 py-3bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Nouveau projet
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <ProjectsTable
        projects={projects}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {/* Modal du formulaire */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header du modal */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {editingProject ? "Modifier le projet" : "Nouveau projet"}
              </h2>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Contenu du modal */}
            <div className="p-6">
              <ProjectForm
                key={editingProject ? editingProject.id : "new"}
                initialProject={editingProject}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsAdminPage;
