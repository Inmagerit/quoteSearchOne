import { useState } from "react";

// Componente de búsqueda de citas en un libro
const BookQuoteSearch = () => {
  const [quote, setQuote] = useState(""); // Input del usuario para la cita
  const [results, setResults] = useState(null); // Almacena los resultados de la API
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Almacena los errores

  // Función para hacer la búsqueda en la API de Archive.org
  const handleSearch = async () => {
    setLoading(true); // Mostrar indicador de carga
    setError(null); // Resetear error
    setResults(null); // Limpiar resultados anteriores

    // Parámetros específicos del libro (se pueden modificar para usar otros libros)
    const hostname = "ia800204.us.archive.org"; // Host del libro
    const item_id = "designevaluation25clin"; // ID del libro en Archive.org
    const doc = "designevaluation25clin"; // Documento (generalmente es igual al item_id)
    const path = "/27/items/designevaluation25clin"; // Ruta interna del libro

    // Cita introducida por el usuario para buscar
    const query = quote;

    // Construcción de la URL para la API de búsqueda
    const apiUrl = `https://${hostname}/fulltext/inside.php?item_id=${item_id}&doc=${doc}&path=${path}&q=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(apiUrl); // Realiza la solicitud a la API
      const data = await response.json(); // Convierte la respuesta en formato JSON

      // Verifica si hay coincidencias
      if (data.matches && data.matches.length > 0) {
        setResults(data.matches); // Almacenar los resultados si hay coincidencias
      } else {
        setResults([]); // Si no hay coincidencias, resultado vacío
      }
    } catch (err) {
      setError("Hubo un error al buscar la cita"); // Manejo de errores
    } finally {
      setLoading(false); // Finalizar el indicador de carga
    }
  };

  return (
    <div>
      <h1>Búsqueda de Citas en Libros</h1>
      <input
        type="text"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Introduce una cita"
      />
      <button onClick={handleSearch} disabled={!quote || loading}>
        {loading ? "Buscando..." : "Buscar Cita"}
      </button>

      {/* Muestra el error si existe */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar los resultados */}
      {results && (
        <div>
          {results.length > 0 ? (
            <ul>
              {results.map((match, index) => (
                <li key={index}>
                  <p>
                    <strong>Texto encontrado:</strong> {match.text}
                  </p>
                  <p>
                    <strong>Página:</strong> {match.par[0].page}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron coincidencias para la cita.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookQuoteSearch;
