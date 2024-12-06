import { useState } from 'react';

const useGoogleBooksSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para buscar libros en Google Books API
  const searchBooks = async (query) => {
    if (query.trim() === '') return;

    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Error al buscar libros:', error);
      setError('Hubo un problema al buscar los libros.');
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, searchBooks };
};

export default useGoogleBooksSearch;
