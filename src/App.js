import React, { useState, useContext, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import ProductSearch from './components/ProductSearch';
import ProductList from './components/ProductList';
import { ThemeContext } from './contexts/ThemeContext';

// Create a wrapper component to handle dark mode
const ThemedApp = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Apply dark mode to html element
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <LanguageSelector />
            <ThemeToggle />
          </header>
          <main>
            <ProductSearch onSearch={setSearchTerm} />
            <div className="mt-8">
              <ProductList searchTerm={searchTerm} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Main App component with providers
function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
