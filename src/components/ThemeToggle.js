import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);
  
  return (
    <button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
        isDarkTheme 
          ? 'bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600' 
          : 'bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50'
      }`}
    >
      {isDarkTheme ? translations.modeClair : translations.modeSombre}
    </button>
  );
};

export default ThemeToggle;