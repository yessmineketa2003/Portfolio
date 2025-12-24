import React from "react";
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";

const About = () => {
  const user = {
    name: "Yassmine Ketata",
    title: "Étudiante en Génie Logiciel • Développeuse Web & Data Analyst",
    tagline:
      "Passionnée par le développement web, la data et les technologies modernes",

    mainDescription:
      "Étudiante en 3ᵉ année Génie Logiciel à l’Institut International de Technologie (IIT Sfax). Certifiée IBM Data Analyst, je m’intéresse particulièrement au développement web et aux applications bancaires. J’ai réalisé plusieurs projets académiques et professionnels en React, Flutter, PHP/CakePHP, .NET et Unity.",

    stats: {
      projects: 6,
      softSkills: [
        { skill: "Communication", value: "💬 Très bonne" },
        { skill: "Travail en équipe", value: "🤝 Excellent" },
        { skill: "Organisation", value: "📅 Très bonne" },
      ],
    },
  };

  return (
    <section id="about" className="bg-gray-900 pt-24 text-white">
      <div className="py-24 sm:py-32 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">
            {user.tagline}
          </h2>
          <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
          <h3 className="text-lg text-purple-300 mb-6">{user.title}</h3>
          <p className="text-gray-300 bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-lg">
            {user.mainDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Stat value={user.stats.projects + "+"} label="Projets réalisés" />
          {user.stats.softSkills.map((s, i) => (
            <Stat key={i} value={s.value} label={s.skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }) => (
  <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 text-center border border-gray-700/50">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-purple-300 font-medium">{label}</div>
  </div>
);

export default About;
