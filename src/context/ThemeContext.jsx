// src/context/ThemeContext.jsx
import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Toujours en mode dark
  const theme = "dark";

  const colors = {
    bg: {
      primary: "from-gray-900 via-slate-900 to-gray-900",
      secondary: "bg-gray-800/50",
      tertiary: "bg-gray-900/50",
      card: "bg-gray-800/50",
      hover: "hover:bg-gray-700/50",
    },
    text: {
      primary: "text-gray-200",
      secondary: "text-gray-400",
      tertiary: "text-gray-500",
    },
    border: "border-gray-700/50",
    accent: {
      purple: "from-purple-600 to-pink-600",
      hover: "hover:bg-gray-700",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
