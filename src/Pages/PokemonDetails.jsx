
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PokemonService from '../Service/PokemonService';

function PokemonDetails() {
    const { name } = useParams();
    const [data, setData] = useState([]);
    const [pokemonImg, setPokemonImg] = useState('');
    const [pokemonEggGroup, setPokemonEggGroup] = useState('');
    const [pokemonGrowthRate, setPokemonGrowthRate] = useState("");
    const [pokemonShape, setPokemonShape] = useState('');

    const [bookmarkStatus, setBookmarkStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        getBookmarks();
    }, []);
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const resp = await PokemonService.searchPokemon(name);
            const promises = [
                PokemonService.getPokemonImage(resp?.id),
                PokemonService.getPokemonEggGroup(resp?.id),
                PokemonService.getPokemonGrowthRate(resp?.id),
                PokemonService.getPokemonShape(resp?.id)
            ];

            const results = await Promise.allSettled(promises);
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    const data = result.value;
                    if (index === 0) {
                        setPokemonImg(data);
                    } else if (index === 1) {
                        setPokemonEggGroup(data?.name);
                    } else if (index === 2) {
                        setPokemonGrowthRate(data?.name);
                    } else if (index === 3) {
                        setPokemonShape(data?.name);
                    }
                } else {
                    console.error('API call failed:', result.reason);
                    // setPokemonImg(defaultImg);
                    setPokemonEggGroup('NA');
                    setPokemonGrowthRate('NA');
                    setPokemonShape('NA');
                }
            });

            setData(resp);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getBookmarks = () => {
        let bookmark = JSON.parse(localStorage.getItem('bookmark_data'));
        if (bookmark?.some(item => item.name === name)) {
            setBookmarkStatus(true);
        }
    }
    const setBookmarksData = (name) => {
        const bookmark_data = { name: name, bookmark: true };
        let bookmark = localStorage.getItem('bookmark_data');

        bookmark = bookmark ? JSON.parse(bookmark) : [];
        if (!bookmark.some(item => item.name === name)) {
            bookmark.push(bookmark_data);
            localStorage.setItem("bookmark_data", JSON.stringify(bookmark));
        }
        setBookmarkStatus(true);

    }
    const backToPokemon = () => {
        navigate('/');
    }


    return (
        <div className='d-flex justify-center align-items-center w-100 h-100vh '>
            <div className='w-25 d-flex flex-direction-col gap-2'>
                <button onClick={backToPokemon} className='w-50 align-self-center outlined-btn'> &#8592; Back to Pokemon</button>
                {isLoading ? <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                    :
                    <img src={pokemonImg} alt={name} className='w-100' />}
                {bookmarkStatus ? <button className='w-50 align-self-center' disabled>Already Bookmarked</button> :
                    <button onClick={() => setBookmarksData(name)} className='w-50 align-self-center'>Book mark</button>
                }

            </div>
            <div className="tabs w-75 d-flex justify-center align-items-center gap-2">
                <div className="table h-75vh">
                    <h2 className="heading">About {name}</h2>
                    <div className="block">
                        <p className="d-flex justify-between align-items-center">Height<span className="price">{data.height * 10}<sub> CM.</sub></span></p>
                    </div>
                    <div className="block">
                        <p className="d-flex justify-between align-items-center">Weight <span className="price">{data.weight * 0.1}<sub> KG.</sub></span> </p>
                    </div>
                    <div className="block d-flex justify-between align-items-baseline">
                        <p className="d-flex justify-between align-items-center">Abilities</p>
                        <div>
                            {data.abilities?.map(ab => (
                                <p className="d-flex justify-between align-items-center"><sub>{ab?.ability?.name}</sub> </p>
                            ))}
                        </div>
                    </div>
                    <div className="block">
                        <p className="d-flex justify-between align-items-center">Grouth Rate <span className="price">{pokemonGrowthRate}</span></p>
                    </div>
                    <div className="block">
                        <p className="d-flex justify-between align-items-center">Egg Groups<span className="price">{pokemonEggGroup}</span></p>
                    </div>
                    <div className="block">
                        <p className="d-flex justify-between align-items-center">Shape<span className="price">{pokemonShape}</span></p>
                    </div>
                </div>



                <div className="table h-75vh">
                    <h2 className="heading">Base Stats</h2>
                    {data.stats?.map(st => (
                        <div className="block">
                            <p className="d-flex justify-between align-items-center">{st.stat.name}<span className="price">{st.base_stat}</span></p>
                        </div>
                    ))}
                    <div className="block">
                        <p className="d-flex justify-between align-items-center">Total<span className="price">
                            {data.stats?.reduce((sum, st) => sum + st.base_stat, 0)}
                        </span></p>
                    </div>
                </div>


                <div className="table h-75vh">
                    <h2 className="heading">Moves </h2>
                    {data.moves?.map(mvs => (
                        <div className="block">
                            <p className="d-flex justify-between align-items-center">{mvs.move.name}</p>
                        </div>
                    ))}

                </div>

            </div>
        </div>)
}

export default PokemonDetails;

