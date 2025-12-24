// Pages/Projets.jsx
import React from "react";
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";

const Projets = () => {
  const projects = [
    {
      title: "Site Web Salle de Sport – IIT Sfax",
      description:
        "Développement d’un site web moderne pour présenter une salle de sport. Réalisé avec HTML et CSS en 2023.",
      tech: ["HTML", "CSS"],
      github: "#",
      demo: "#",
    },
    {
      title: "Jasmine Coffee – Site Web Coffee Shop",
      description:
        "Création d’un site web complet pour un coffee shop avec animations. Projet universitaire 2024.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "#",
      demo: "#",
    },
    {
      title: "BankApp – Application Bancaire",
      description:
        "Application permettant de visualiser les comptes bancaires de différentes banques. Développée avec PHP (CakePHP 4) et Flutter.",
      tech: ["PHP", "CakePHP4", "Flutter", "MySQL"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-blue-600">
            Mes Réalisations
          </h2>
          <p className="mt-2 text-4xl font-bold text-gray-900">
            Projets Universitaires & Professionnels
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Voici quelques projets que j’ai réalisés durant mes études et
            formations, montrant mon évolution en développement web et mobile.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-purple-600 text-4xl mb-4">
                <FaFolderOpen />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-smbg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  <FaGithub /> Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projets;
