/* Ajoutez ces couleurs à votre tailwind.config.js dans la section colors */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Gaming Dark Theme
        "cyber-dark": "#0a0e27",
        "cyber-darker": "#050815",
        "cyber-navy": "#141b3d",
        "cyber-blue": "#00d4ff",
        "cyber-blue-dark": "#0099cc",
        "cyber-purple": "#b026ff",
        "cyber-pink": "#ff006e",
        "cyber-green": "#00ff88",
        "cyber-yellow": "#ffea00",
        "neon-blue": "#00fff5",
        "neon-purple": "#bd00ff",
        "neon-pink": "#ff0080",
        "neon-green": "#39ff14",
      },
      boxShadow: {
        "neon-blue":
          "0 0 20px rgba(0, 255, 245, 0.5), 0 0 40px rgba(0, 255, 245, 0.3)",
        "neon-purple":
          "0 0 20px rgba(189, 0, 255, 0.5), 0 0 40px rgba(189, 0, 255, 0.3)",
        "neon-pink":
          "0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3)",
        "neon-green":
          "0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3)",
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        scan: "scan 2s linear infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
};
