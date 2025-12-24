import { Edit, Trash2, FolderOpen } from "lucide-react";

function ProjectsTable({ projects, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-12 text-center shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300";
      case "draft":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300";
      case "archived":
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400";
      default:
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "online":
        return "En ligne";
      case "draft":
        return "Brouillon";
      case "archived":
        return "Archivé";
      default:
        return status;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Technologies
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className="hover:bg-gray-900/30 transition-colors"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <td className="px-6 py-4">
                  <span className="text-gray-200 font-medium">
                    {project.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs font-medium text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack?.length > 3 && (
                      <span className="px-3 py-1 bg-gray-700/50 rounded-lg text-xs font-medium text-gray-400">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-lgbg-gradient-to-br border text-xs font-medium ${getStatusColor(
                      project.status || "draft"
                    )}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                    {getStatusLabel(project.status || "draft")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(project)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Supprimer ce projet ?")) {
                          onDelete(project.id);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                      <FolderOpen className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-500">Aucun projet pour le moment</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;
