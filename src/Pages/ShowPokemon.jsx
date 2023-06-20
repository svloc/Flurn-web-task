import React, { useState, useEffect } from "react";
import PokemonService from "../Service/PokemonService";
import { useNavigate } from "react-router-dom";
import SearchPokemon from "./SearchPokemon";


const fetchPokemonData = async (len) => {
    const promiseArr = [];
    for (let i = len; i < len + 10; i++) {
        promiseArr.push(PokemonService.searchPokemon(i));
    }
    const resolvedData = await Promise.all(promiseArr);
    return resolvedData.map((item) => {
        return {
            name: item.name,
            sprite: item.sprites.front_default
        };
    });
};

export default function ShowPokemon() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setMessage("Loading...");
        const resp = await fetchPokemonData(1);
        setData(resp);
        setLoading(false);
    };
    const handleScroll = () => {
        setMessage("Loading...");
        setLoading(true);
        fetchPokemonData(data.length).then((newPokemons) => {
            setData([...data, ...newPokemons]);
            setLoading(false);
        });

    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [data]);

    const handleNavigate = (pokemon) => {
        const { name } = pokemon;
        navigate(`/${name}`);
    };

    return (
        <>
            <div className="navbar">
                <SearchPokemon />
            </div>
            <div className="container ">

                <div className="d-flex flex-wrap gap-1 align-items-center justify-cente">
                    {data.map((pokemon, index) => (
                        <div className="card d-flex flex-direction-col justify-center align-items-center" key={"num" + index} onClick={() => handleNavigate(pokemon)}>
                            <img src={pokemon.sprite} alt={pokemon.name} width={'100%'} />
                            <h1> {pokemon.name} </h1>
                        </div>
                    ))}
                </div>
                {isLoading && <h1 className="pokemonName">{message}</h1>}
            </div>
        </>
    );
}
