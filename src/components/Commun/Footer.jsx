import React from "react";
import { Link } from "react-router-dom";
import { Mail, Heart, MapPin, Phone, Code } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // icons corrects

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    github: "https://github.com/yessmineketa2003",
    linkedin: "https://www.linkedin.com/in/yassmine-ketata-913725389/",
    email: "mailto:yessmine.keta.2003@gmail.com",
  };

  const quickLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Projets", path: "/projects" },
    { name: "Expérience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Développement Mobile",
    "Développement Web",
    "UI/UX Design",
    "Data Analysis",
    "BI",
    "Machine Learning",
    "Big Data",
    "Bases de Données",
  ];

  return (
    <footer className="relative bg-gray-900 text-gray-300 border-t border-gray-800 mt-20 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Section supérieure */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand + présentation */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Yassmine Ketata
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Étudiante en Génie Logiciel & Développeuse Full-Stack passionnée
              par les technologies modernes et l'innovation.
            </p>

            {/* Icônes réseaux */}
            <div className="flex gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaGithub className="text-gray-400 group-hover:text-white" />
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaLinkedin className="text-gray-400 group-hover:text-white" />
              </a>

              <a
                href={socialLinks.email}
                className="group w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Mail className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-purple-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact infos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-800">
          {/* localisation */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Localisation</p>
              <p className="text-gray-300 font-medium">Sfax, Tunisie</p>
            </div>
          </div>

          {/* email */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/10 border border-pink-500/30 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <a
                href="mailto:yessmine.keta.2003@gmail.com"
                className="text-gray-300 hover:text-pink-400 font-medium"
              >
                yessmine.keta.2003@gmail.com
              </a>
            </div>
          </div>

          {/* téléphone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Téléphone</p>
              <a
                href="tel:+21629541505"
                className="text-gray-300 hover:text-cyan-400 font-medium"
              >
                +216 29541505
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <span>© {currentYear}</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
<div class="w-12 h-12bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-code w-6 h-6 text-white"
    aria-hidden="true"
  >
    <path d="m16 18 6-6-6-6"></path>
    <path d="m8 6-6 6 6 6"></path>
  </svg>
</div>;
