import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [quotes, setQuotes] = useState([]);

    const searchQuotes = useCallback(async () => {
        if (query.trim() === '') return;
        try {
            const response = await axios.get(`https://api.quotable.io/search/quotes?query=${query}`);
            setQuotes(response.data.results);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    }, [query]);

    useEffect(() => {
        searchQuotes();
    }, [searchQuotes]);

    const saveFavourite = async (quote) => {
        try {
            await axios.post('http://localhost:8080/favourites', {
                quote_id: quote._id,
                content: quote.content,
                author: quote.author
            });
            alert('Favourite saved successfully!');
        } catch (error) {
            console.error('Error saving favourite:', error);
        }
    };

    return (
        <div className="search-page">
            <h1>Search Quotes</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a quote"
                className="form-control mb-2"
            />
            <button onClick={searchQuotes} className="btn btn-primary">Search</button>
            <div className="quotes-list mt-4">
                {quotes.map(quote => (
                    <div key={quote._id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{quote.author}</h5>
                            <p className="card-text">"{quote.content}"</p>
                            <button onClick={() => saveFavourite(quote)} className="btn btn-secondary">Favourite</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
