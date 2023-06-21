
import React, { useState, useEffect } from "react";
import PokemonService from "../Service/PokemonService";
import { useNavigate } from "react-router-dom";
import SearchPokemon from "./SearchPokemon";
import bgBlobImg1 from '../Assets/bg-blob-1.svg';
import bgBlobImg2 from '../Assets/bg-blob-2.svg';
import bgBlobImg3 from '../Assets/bg-blob-3.svg';
import bgBlobImg4 from '../Assets/bg-blob-4.svg';
import bgBlobImg5 from '../Assets/bg-blob-5.svg';
import bgBlobImg6 from '../Assets/bg-blob-6.svg';


export default function ShowPokemon() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [nextPokemonUrl, setNextPokemonUrl] = useState('');
    const [pokemonImg, setPokemonImg] = useState([]);

    const navigate = useNavigate();
    const bgImages = [bgBlobImg1, bgBlobImg2, bgBlobImg3,bgBlobImg4,bgBlobImg5, bgBlobImg6];
    useEffect(() => {
        fetchInitialPokemonData();
    }, []);

    const fetchInitialPokemonData = async () => {
        setLoading(true);
        setMessage("Loading...");
        const resp = await PokemonService.getPokemonList();
        const pokemonUrls = resp.results.map((pokemon) => pokemon.url);
        const pokemonImages = await Promise.all(pokemonUrls.map(extractSingleImage));
        const uniqueImages = [...new Set(pokemonImages)];
        setPokemonImg(uniqueImages);
        setNextPokemonUrl(resp.next);
        setData(resp.results);
        setLoading(false);
    };

    const extractSingleImage = async (url) => {
        const resImg = await PokemonService.getPokemonImage(extractNumberFromUrl(url));
        return resImg;
    };

    const extractNumberFromUrl = (url) => {
        const regex = /\/(\d+)\//;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleScroll = async () => {
        if (window.scrollY >= (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 0.8) {
            setMessage("Loading...");
            setLoading(true);
            const onScrollFetchPokemonData = await PokemonService.getNextPokemonFromUrl(nextPokemonUrl);
            const pokemonUrls = onScrollFetchPokemonData.results.map((pokemon) => pokemon.url);
            const pokemonImages = await Promise.all(pokemonUrls.map(extractSingleImage));
            const uniqueImages = [...new Set(pokemonImages)];
            setPokemonImg((prevImages) => [...prevImages, ...uniqueImages]);
            setData((prevData) => [...prevData, ...onScrollFetchPokemonData.results]);
            setNextPokemonUrl(onScrollFetchPokemonData.next);
        }
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
            <div className="container">
                <div className="d-flex flex-wrap gap-1 align-items-center justify-cente">
                    {data.map((pokemon, index) => (
                        <div className="card d-flex flex-direction-col justify-center align-items-center"
                            key={"num" + index} onClick={() => handleNavigate(pokemon)} style={{ backgroundImage: `url(${bgImages[index % 6]})`}} >
                            <img src={pokemonImg[index]} alt={pokemon.name} width={'100%'} className="pokemon-img" />
                            <h1> {pokemon.name} </h1>
                        </div>
                    ))}
                </div>
                {isLoading && <h1 className="pokemonName">{message}</h1>}
            </div>
        </>
    );
}

