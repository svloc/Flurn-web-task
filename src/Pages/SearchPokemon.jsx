import React, { useState } from 'react';
import PokemonService from '../Service/PokemonService';

const SearchPokemon = ({ handleSearchResult, resetData }) => {
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
            handleSearchResult(pokemon);
        } catch (error) {
            setError('Failed to fetch Pokemon. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const trimmedValue = e.target.value.trim().toLowerCase();
        setSearchTerm(trimmedValue);
        resetData();
    };


    return (
        <>
            <form onSubmit={handleSubmit} className='w-50 d-flex'>
                <input type="search" className='w-100' value={searchTerm} onChange={handleInputChange} placeholder="Enter Pokemon Name or ID" />
                <button type="submit">Search</button>
            </form>
            {isLoading && <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>}
            {error && <p className='text-red ml-1'>{error}</p>}
        </>
    );
};

export default SearchPokemon;
