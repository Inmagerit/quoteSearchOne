import  { useState } from 'react';
import useSearchApi from '../hooks/useSearchApi';

const QuoteBookSearch = () => {
  const [userInput, setUserInput] = useState('');
  const { results, error } = useSearchApi(userInput);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!userInput.trim()) {
        console.log("La consulta está vacía. No se envía búsqueda.");
        return;
    }

    // Si no está vacío, continúa con la búsqueda
    console.log("Realizando búsqueda con:", userInput);
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="userInput" 
          value={userInput}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>Error: {error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <strong>{result.author}:</strong> {result.content} - <em>{result.title}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteBookSearch;
