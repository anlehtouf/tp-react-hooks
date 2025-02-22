import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

const ButtonStyle = {
  primary: `bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg 
    transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
    disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`,
  secondary: `bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-1.5 rounded-lg 
    transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5
    dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white`,
  pagination: `flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-200 
    shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 
    disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50
    dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600`
};

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);
  const { 
    products, 
    loading, 
    error, 
    page, 
    totalPages, 
    nextPage, 
    prevPage, 
    reload 
  } = useProductSearch(searchTerm);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-6 text-lg">{error}</div>
        <button 
          onClick={reload}
          className={ButtonStyle.primary}
        >
          {translations.reload}
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          {translations.noProducts}
        </div>
        <button 
          onClick={reload}
          className={ButtonStyle.primary}
        >
          {translations.reload}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                ${product.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.title}</h3>
              <p className={`text-sm mb-3 line-clamp-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  {translations.price}: ${product.price}
                </span>
                <button className={ButtonStyle.secondary}>
                  {translations.details}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-4 py-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg font-medium border-2 disabled:opacity-50 disabled:cursor-not-allowed
            bg-white text-gray-800 border-gray-200 hover:bg-gray-50
            dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          ← {translations.previous}
        </button>

        <span className="px-3 py-1 rounded-lg font-medium bg-blue-600 text-white">
          {page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg font-medium border-2 disabled:opacity-50 disabled:cursor-not-allowed
            bg-white text-gray-800 border-gray-200 hover:bg-gray-50
            dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          {translations.next} →
        </button>
      </div>
    </div>
  );
};

export default ProductList;