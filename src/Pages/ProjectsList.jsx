// src/Pages/ProjectsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Folder, Eye, Code2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const API_URL = "http://localhost:4000/projects";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Impossible de charger les projets");
        const data = await res.json();
        // Exclure les projets archivés
        setProjects(data.filter((p) => p.status !== "archived"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div
        className={`min-h-screenbg-gradient-to-br ${colors.bg.primary} flex items-center justify-center pt-20`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`${colors.text.secondary} text-lg`}>Chargement...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className={`min-h-screenbg-gradient-to-br ${colors.bg.primary} flex items-center justify-center px-4 pt-20`}
      >
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );

  return (
    <section
      className={`min-h-screenbg-gradient-to-br ${colors.bg.primary} px-4 pt-24 pb-16`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
            <Folder className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-boldbg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Mes Projets
          </h1>
          <p className={`${colors.text.secondary} text-lg max-w-2xl mx-auto`}>
            Une sélection de réalisations web, développées avec passion et
            expertise
          </p>
        </header>

        {/* Grid de projets */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article
                key={project.id}
                className={`group ${colors.bg.secondary} backdrop-blur-xl rounded-2xl overflow-hidden border ${colors.border} hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Bandeau visuel */}
                <div className="h-40bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-white/20 group-hover:text-white/30 transition-colors group-hover:scale-110 duration-300" />
                  </div>
                </div>

                <div className="p-6 flex flex-col space-y-4">
                  {/* Titre */}
                  <h2
                    className={`text-xl font-bold ${colors.text.primary} group-hover:text-purple-400 transition-colors line-clamp-2`}
                  >
                    {project.title}
                  </h2>

                  {/* Description */}
                  {project.description && (
                    <p
                      className={`text-sm ${colors.text.secondary} line-clamp-3flex-grow`}
                    >
                      {project.description}
                    </p>
                  )}

                  {/* Tech Stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs font-medium text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span
                          className={`px-3 py-1 ${colors.bg.tertiary} rounded-lg text-xs font-medium ${colors.text.secondary}`}
                        >
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bouton Voir le projet */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="group/btn inline-flex items-center justify-center gap-2 px-4 py-3bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Voir le projet
                  </Link>

                  {/* Status */}
                  {project.status && (
                    <div className="flex items-center justify-center">
                      <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs font-medium text-gray-400 capitalize">
                        {project.status}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 ${colors.bg.secondary} rounded-full mb-4`}
              >
                <Folder className={`w-10 h-10 ${colors.text.tertiary}`} />
              </div>
              <p className={`${colors.text.tertiary} text-lg`}>
                Aucun projet disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsList;
