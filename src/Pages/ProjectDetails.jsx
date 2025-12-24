// src/Pages/ProjectDetails.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const API_URL = "http://localhost:4000/projects";

const techLogos = {
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Three.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  Tailwind:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
};

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/${id}`);
        if (res.status === 404) {
          setError("Projet introuvable");
          return;
        }
        if (!res.ok) throw new Error("Erreur lors du chargement du projet");
        const data = await res.json();
        setProject(data);

        // Vérifie si data.images existe et n'est pas vide
        if (data.images && data.images.length > 0) {
          const imgPaths = data.images.map((img) =>
            img.startsWith("/") ? img : `/assets/projects/${img}`
          );
          setImages(imgPaths);
        } else {
          setImages([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-linear-to-br ${colors.bg.primary} flex items-center justify-center pt-20`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`${colors.text.secondary} text-lg`}>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen bg-linear-to-br ${colors.bg.primary} flex items-center justify-center px-4 pt-20`}
      >
        <div
          className={`max-w-md w-full ${colors.bg.secondary} backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 text-center shadow-2xl`}
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <p className="text-red-400 mb-6 text-lg">{error}</p>
          <button
            onClick={() => navigate("/projects")}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <section
      className={`min-h-screen bg-linear-to-br ${colors.bg.primary} pt-24 pb-12 px-4`}
    >
      <div className="max-w-6xl mx-auto">
        <Link
          to="/projects"
          className={`group inline-flex items-center gap-2 ${colors.text.secondary} hover:text-purple-400 transition-colors mb-8 text-sm font-medium`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à la liste
        </Link>

        <div
          className={`${colors.bg.secondary} backdrop-blur-xl rounded-3xl border ${colors.border} overflow-hidden shadow-2xl`}
        >
          {/* Header */}
          <div className="h-48 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {project.title}
              </h1>
              {project.status && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-purple-300 capitalize">
                    {project.status}
                  </span>
                </div>
              )}
            </header>

            {/* Description */}
            {project.description && (
              <div
                className={`${colors.bg.tertiary} rounded-2xl p-6 border ${colors.border}`}
              >
                <p className={`${colors.text.primary} leading-relaxed text-lg`}>
                  {project.description}
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <h2
                    className={`text-lg font-semibold ${colors.text.primary}`}
                  >
                    Technologies utilisées
                  </h2>
                </div>
                <div className="flex flex-wrap gap-6">
                  {project.techStack.map((tech, index) => (
                    <div
                      key={tech}
                      className="group relative flex flex-col items-center gap-3"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative">
                        <div className="w-20 h-20 bg-linear-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/50">
                          {techLogos[tech] ? (
                            <img
                              src={techLogos[tech]}
                              alt={tech}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <Code2 className="w-8 h-8 text-purple-400" />
                          )}
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-0.5 bg-linear-to-b from-purple-500/50 to-transparent"></div>
                      </div>
                      <span className="text-sm font-medium text-purple-300 bg-gray-900/50 px-3 py-1 rounded-lg border border-purple-500/30">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Boutons Code et Galerie */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {project.githubUrl && (
                <button
                  onClick={() => window.open(project.githubUrl, "_blank")}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gray-900/50 transition-all duration-300 hover:scale-105 border border-gray-600"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Voir le code
                </button>
              )}
              {images.length > 0 && (
                <button
                  onClick={() => setShowGallery(true)}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 border border-cyan-400"
                >
                  <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Voir les réalisations ({images.length})
                </button>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Voir le site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Galerie */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-6xl my-8">
            <button
              className="sticky top-4 float-right z-20 p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors mb-4"
              onClick={() => setShowGallery(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Galerie - {project.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className="relative group cursor-pointer aspect-video rounded-xl overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={img}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal image plein écran */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default ProjectDetails;
