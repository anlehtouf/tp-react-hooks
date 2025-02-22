import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const LanguageContext = createContext();

const translations = {
  fr: {
    loading: 'Chargement...',
    noProducts: 'Aucun produit trouvé',
    price: 'Prix',
    error: 'Une erreur est survenue',
    searchPlaceholder: 'Rechercher un produit...',
    modeClair: 'Mode Clair',
    modeSombre: 'Mode Sombre',
    reload: 'Recharger',
    previous: 'Précédent',
    next: 'Suivant',
    page: 'Page',
    details: 'Détails'
  },
  en: {
    loading: 'Loading...',
    noProducts: 'No products found',
    price: 'Price',
    error: 'An error occurred',
    searchPlaceholder: 'Search for a product...',
    modeClair: 'Light Mode',
    modeSombre: 'Dark Mode',
    reload: 'Reload',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    details: 'Details'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'fr');

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        translations: translations[language] 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}; 