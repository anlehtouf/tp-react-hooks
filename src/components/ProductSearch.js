import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  
  // Utilisation du hook useDebounce
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Effet pour déclencher la recherche quand debouncedSearchTerm change
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations.searchPlaceholder}
        className={`w-full p-2 rounded border ${
          isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        }`}
      />
    </div>
  );
};

export default ProductSearch;