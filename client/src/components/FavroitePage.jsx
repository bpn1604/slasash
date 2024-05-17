import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FavouritesPage() {
    const [favourites, setFavourites] = useState([]);
    console.log(favourites)
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get('http://localhost:8080/favourites');
                setFavourites(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching favourites:', error);
            }
        };

        fetchFavourites();
    }, []);

    return (
        <div className="favourites-page">
            <h1>Favourites</h1>
            <div className="favourites-list mt-4">
                {favourites.map(favourite => (
                    <div key={favourite.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{favourite.author}</h5>
                            <p className="card-text">"{favourite.content}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavouritesPage;
