import { useEffect, useState } from "react";

const useSearchApi = (search) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://b3fffuqfjko4co3pig65lrwr3i0ounqa.lambda-url.eu-west-2.on.aws/?query=${encodeURIComponent(search)}`); // Agregar query al URL
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
                const data = await response.json();
        
                console.log('Fetched data:', data);
        
                const books = data.books;
        
                if (!Array.isArray(books)) {
                    throw new Error('Expected books to be an array');
                }
        
                const filteredResults = books.filter(item =>
                    item.content.includes(search)
                );
        
                setResults(filteredResults);
                filteredResults.forEach(result => {
                    console.log(`This quote belongs to ${result.author} from his tale ${result.title}`);
                });
            } catch (error) {
                setError(error.message);
            }
        };
        
        fetchData();
    }, [search]); // Se ejecuta cada vez que `search` cambie

    return { results, error };
};

export default useSearchApi;
