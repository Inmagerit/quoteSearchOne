import React, { useState } from 'react';
import useGoogleBooksSearch from '../hooks/useGoogleBookSearch';

function SearchAndCatalog() {
  const [query, setQuery] = useState('');
  const { books, loading, error, searchBooks } = useGoogleBooksSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks(query);
  };

  return (
    <div>
      <h1>Buscador de Google Books</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar libros por título, autor, etc."
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Resultados:</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconocido'}</p>
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchAndCatalog;
