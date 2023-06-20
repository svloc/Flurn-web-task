import React, { useEffect, useState } from 'react'
import PokemonService from '../Service/PokemonService';
import ShowPokemon from './ShowPokemon';

function PokemonListing() {
    useEffect(() => {
        loadPokemonListing();
    }, [])
    const [isSuccess, setIsSuccess] = useState(false);

    const loadPokemonListing = async () => {
        try {
            const pokemon = await PokemonService.getPokemonList();

            setIsSuccess(true);
        } catch (error) {
            setError('Failed to fetch Pokemon. Please try again.');
        }
    }


    return (

        isSuccess ? <ShowPokemon /> : <div>Something went wrong</div>

    )
}

export default PokemonListing;
