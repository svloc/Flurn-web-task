import React, { useState } from 'react';
import PokemonService from '../Service/PokemonService';

const SearchPokemon = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!searchTerm) {
            setError('Please enter a Pokemon name');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const pokemon = await PokemonService.searchPokemon(searchTerm);
            console.log("pokemon res-->", pokemon);
        } catch (error) {
            setError('Failed to fetch Pokemon. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter Pokemon name"
                />
                <button type="submit">Search</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default SearchPokemon;
