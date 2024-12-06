import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:admin@bookscluster.vqnq5.mongodb.net/?retryWrites=true&w=majority&appName=booksCluster";
let client;
let clientPromise;

if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect(); 
}

export const handler = async (event) => {
    const query = event.queryStringParameters?.query || '';

    try {
        
        await clientPromise;
        
        const database = client.db("booksDB");
        const collection = database.collection("booksCOLL");

        const agg = [
            {
                $search: {
                    index: "bookSearchAutocomplete",
                    autocomplete: {
                        query: query,
                        path: "content" 
                    }
                }
            },
            { $limit: 20 },
            { $project: { _id: 0, title: 1, content: 1, author: 1 } }
        ];

        const results = await collection.aggregate(agg).toArray();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ books: results })
        };
    } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ error: 'Error al realizar la búsqueda' })
        };
    }
};
