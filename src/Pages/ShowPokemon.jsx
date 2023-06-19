import React, { useState, useEffect } from "react";
import PokemonService from "../Service/PokemonService";
import { useNavigate } from "react-router-dom";
// import "./styles.css";

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
        const {name}=pokemon;
        navigate(`/${name}`);
      };
    
    return (
        <div className="App">
            <h1 className="header">Pokemon Infinite Scroll</h1>
            <div id="content">
                {data.map((pokemon, index) => (
                    <div className="card" key={"num" + index} onClick={()=>handleNavigate(pokemon)}>
                        <img src={pokemon.sprite} alt={pokemon.name} />
                        <h1 className="pokemonName"> {pokemon.name} </h1>
                    </div>
                ))}
                {isLoading && <h1 className="pokemonName">{message}</h1>}
            </div>
        </div>
    );
}
