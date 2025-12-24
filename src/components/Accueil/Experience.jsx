import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";

import iitImage from "../../assets/iit.png";
import mtdLogo from "../../assets/mtd.png";
import MoiImage from "../../assets/Moi.jpg";
import ibmLogo from "../../assets/ibm.png";
import cvPdf from "../../assets/Ketata_Yassmine_CV.pdf";
import dataPdf from "../../assets/Data_Analysis_Using_Python.pdf";

const Experience = () => {
  const user = {
    name: "Yassmine Ketata",
    title: "Étudiante en Génie Logiciel & Développeuse Full-Stack",
    email: "yessmine.keta.2003@gmail.com",
    phone: "+216 29 541 505",
    location: "Sfax – Tunisie",
    experience: "3 ans",
    availability: " Disponible pour PFE/Stage",
    bio: "Étudiante en Génie Logiciel à l'IIT (North American Private University). Passionnée par le développement web, la création d’applications modernes et l’analyse de données. Je travaille sur des projets réels en React, PHP (CakePHP), Flutter, WAMP et Data Analysis. Actuellement en cours d’apprentissage de l’allemand niveau A2.",
    experiences: [
      {
        id: 1,
        period: "Juillet 2025",
        role: "Stage d'été – Développement Bancaire",
        company: "MTD Group",
        location: "Sfax",
        type: "Stage professionnel",
        description:
          "Participation au développement d’une application bancaire avec back-office sécurisé et application mobile.",
        achievements: [
          "Gestion des comptes, virements, et prêts",
          "Développement de l’interface mobile Flutter",
          "Connexion sécurisée et SharedPreferences",
        ],
        technologies: ["Flutter", "Dart", "PHP", "MySQL", "WAMP", "CSS"],
        image: mtdLogo,
      },
      {
        id: 2,
        period: "2023–2025",
        role: "Projet Académique – Applications & Web",
        company: "IIT & Projets personnels",
        location: "Sfax",
        type: "Projet académique",
        description:
          "Création de projets web et mobiles, optimisation de l’UI/UX, utilisation de Flutter et React.",
        achievements: [
          "Sites web : salle de sport [Décembre 2023], Jassmine Coffee [Novembre 2024], Portfolio [Décembre 2025]",
          "Applications mobiles : Smart Study Planner [Décembre 2025]",
          "Projets Unity 3D [Mai 2025] et Dot.Net eTicket [Juin 2025]",
        ],
        technologies: [
          "React",
          "Tailwind CSS",
          "Flutter",
          "Dart",
          "Unity",
          "DotNet",
          "CSS",
          "HTML",
          "JS",
        ],
        image: iitImage,
      },
      {
        id: 3,
        period: "2024",
        role: "Data Analyst – Certification IBM",
        company: "IBM SkillsBuild",
        location: "En ligne",
        type: "Certification",
        description:
          "Formation certifiée en analyse de données et visualisation.",
        achievements: [
          "Analyse et nettoyage des données",
          "Création de dashboards Power BI",
          "Statistiques et visualisation",
          "Certification IBM validée",
        ],
        technologies: ["Power BI", "Excel", "Python (bases)", "Statistiques"],
        image: ibmLogo,
        pdf: dataPdf,
      },
    ],
    cv: {
      name: "Curriculum Vitae",
      description: "CV complet – Yassmine Ketata",
      url: cvPdf,
    },
  };

  return (
    <section
      id="experience"
      className="min-h-screenbg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-16 pt-24"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-boldbg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Mon Parcours Professionnel
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {user.experience} d’apprentissage, de projets et d’expérience
            pratique.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-16 border border-gray-700/50">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                {user.name}
              </h3>
              <p className="text-xl text-gray-300 font-semibold mb-4">
                {user.title}
              </p>
              <p className="text-gray-400 leading-relaxed bg-gray-900/50 p-5 rounded-xl border border-gray-700/50">
                {user.bio}
              </p>
            </div>
            <div className="space-y-4">
              <InfoItem icon={<MapPin />} text={user.location} />
              <InfoItem icon={"📧"} text={user.email} />
              <InfoItem icon={"📱"} text={user.phone} />
              <div className="flex items-center gap-3bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/30">
                <Briefcase className="text-purple-400" />
                <span className="font-semibold text-white">
                  {user.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-14">
          {user.experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/20 transition"
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={exp.image}
                  alt={exp.company}
                  className="w-16 h-16 object-contain rounded-xl border border-gray-700"
                />
                <div>
                  <h3 className="text-2xl font-boldbg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    {exp.period} • {exp.company}
                  </p>
                </div>
              </div>

              <p className="text-gray-400 mb-5">{exp.description}</p>

              <ul className="space-y-2 mb-6">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="flex gap-3 text-gray-300">
                    <CheckCircle className="text-purple-400 w-5 h-5" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {exp.pdf && (
                <a
                  href={exp.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <FileText /> Télécharger PDF
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CV */}
        <div className="mt-16 text-center">
          <a
            href={user.cv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:scale-105 transition"
          >
            <FileText /> Voir mon CV
          </a>
        </div>
      </div>
    </section>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 text-gray-300">
    <span className="text-purple-400">{icon}</span>
    <span>{text}</span>
  </div>
);

export default Experience;
