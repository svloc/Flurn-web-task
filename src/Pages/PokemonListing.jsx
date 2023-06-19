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
        <div>
            {isSuccess ? 
            <>
                <p>Result receview</p>

                <div >
                <ShowPokemon></ShowPokemon>
                </div>
            </>
                :
                <div>Something went wrong</div>

            }

        </div>
    )
}

export default PokemonListing;
