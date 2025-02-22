import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

function useProductSearch(searchTerm) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Initial fetch
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using search API endpoint when there's a search term
        const url = searchTerm 
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`
          : 'https://dummyjson.com/products?limit=100';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const fetchedProducts = data.products || [];
        
        setAllProducts(fetchedProducts);
        setTotalPages(Math.ceil(fetchedProducts.length / ITEMS_PER_PAGE));
        
        // Paginate the results
        const start = (page - 1) * ITEMS_PER_PAGE;
        const paginatedProducts = fetchedProducts.slice(start, start + ITEMS_PER_PAGE);
        setProducts(paginatedProducts);
        
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setAllProducts([]);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [searchTerm, page]); // Re-fetch when search term or page changes

  const nextPage = () => setPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));
  const reload = () => {
    setPage(1);
    setAllProducts([]);
    setProducts([]);
  };

  return { 
    products, 
    loading, 
    error,
    page,
    totalPages,
    nextPage,
    prevPage,
    reload
  };
}

export default useProductSearch;