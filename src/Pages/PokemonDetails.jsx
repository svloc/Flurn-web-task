
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonService from '../Service/PokemonService';

function PokemonDetails() {
    const { name } = useParams();
    const [data, setData] = useState([]);
    const [pokemonImg, setPokemonImg] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
   
    useEffect(() => {
        fetchData();
        getBookmarks();
    }, []);

    const fetchData = async () => {
        const resp = await PokemonService.searchPokemon(name);
        const resImg= await PokemonService.getPokemonImage(resp.id);
        setData(resp);
        console.log(resImg);
        setPokemonImg(resImg);
    };

    const getBookmarks=()=>{
        setBookmarks(JSON.parse(localStorage.getItem('bookmarks_data')));
    }
    const setBookmarksData=(name)=>{
       const bookmarks_data={name:name,bookmark:true};
       let bookmark = localStorage.getItem('bookmarks_data');
       bookmark = bookmark ? JSON.parse(bookmark) : [];
       localStorage.setItem("bookmarks_data",JSON.stringify(bookmark));
       bookmarks.push(bookmarks_data);
    }
  
    return (
        <div>
            <p>Name: {name}</p> 
            <img src={pokemonImg} alt={name}/>
            <button onClick={()=>setBookmarksData(name)}>Book mark</button>
        </div>)
}

export default PokemonDetails;

