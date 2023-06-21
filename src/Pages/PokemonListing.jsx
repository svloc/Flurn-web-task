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
        isSuccess ? <ShowPokemon /> :
            <div className='loader-wrapper d-flex align-items-center justify-center'>
                <div className="sk-circle ">
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
                </div>
            </div>

    )
}

export default PokemonListing;
