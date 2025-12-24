import React from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaPlay,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";
import moi from "../../assets/Moi.jpg";

const Hero = () => {
  const user = {
    name: "Yassmine Ketata",
    title: "Étudiante en Génie Logiciel & Future Développeuse Full-Stack",
    tagline: "Construire, apprendre et évoluer vers l’excellence",
    description:
      "Étudiante en 3ᵉ année Génie Logiciel à l'IIT (Sfax – Tunisie). Passionnée par le développement web, le design d’applications modernes, la data et la création de solutions digitales. Je travaille sur des projets réels en React, PHP, CakePHP et Flutter.",
    avatar: moi,
    stats: {
      projects: 15,
      clients: "Académiques",
      support: "Toujours disponible",
    },
    socials: {
      github: "https://github.com/yessmineketa2003",
      linkedin: "https://www.linkedin.com/in/yassmine-ketata-913725389/",
      email: "mailto:yessmine.keta.2003@gmail.com",
    },
    location: "Sfax • Tunisie",
  };

  return (
    <section
      id="hero"
      className="relativebg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Effets de lumière */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-white">
              {user.location} • Étudiante motivée
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Bonjour, je suis
            <span className="block text-white mt-2">{user.name}</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
            {user.title}
          </h2>

          <p className="text-lg text-gray-300 max-w-xl bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl">
            {user.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/projects"
              className="bg-gradient-to-rfrom-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2 shadow-lg"
            >
              <FaRocket /> Voir mes projets
            </Link>
            <Link
              to="/contact"
              className="border-2 border-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-500/10 transition flex items-center gap-2 hover:scale-105"
            >
              <FaPlay /> Me contacter
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-4 pt-4">
            <a
              href={user.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center"
              title="GitHub"
            >
              <FaGithub className="text-2xl text-gray-400 hover:text-purple-400" />
            </a>
            <a
              href={user.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/50 transition flex items-center justify-center"
              title="LinkedIn"
            >
              <FaLinkedin className="text-2xl text-gray-400 hover:text-pink-400" />
            </a>
            <a
              href={user.socials.email}
              className="bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center justify-center"
              title="Envoyer un email"
            >
              <FaEnvelope className="text-2xl text-gray-400 hover:text-cyan-400" />
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-gray-700/50">
            <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:scale-105 transition border border-gray-700/50 hover:border-purple-500/50">
              <p className="text-3xl font-bold text-white">
                {user.stats.projects}+
              </p>
              <p className="text-gray-300 text-sm">
                Projets académiques & perso
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:scale-105 transition border border-gray-700/50 hover:border-purple-500/50">
              <p className="text-3xl font-bold text-white">
                {user.stats.clients}
              </p>
              <p className="text-gray-300 text-sm">Implication</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:scale-105 transition border border-gray-700/50 hover:border-purple-500/50">
              <p className="text-3xl font-bold text-white">
                {user.stats.support}
              </p>
              <p className="text-gray-300 text-sm">Motivation</p>
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="absolute inset-0bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
          <img
            src={user.avatar}
            alt={user.name}
            className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
