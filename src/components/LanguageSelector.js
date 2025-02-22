import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className={`px-4 py-2 rounded-lg font-medium border-2 transition-colors duration-200
        ${isDarkTheme 
          ? 'bg-gray-800 text-white border-gray-700 hover:border-gray-600' 
          : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
        }`}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector; 