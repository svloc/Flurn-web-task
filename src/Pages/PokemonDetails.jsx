
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonService from '../Service/PokemonService';

const pokemonTabs = [
    {
        id: '1',
        tabTitle: "About",
    },
    {
        id: '2',
        tabTitle: "Base State",
    },
    {
        id: '3',
        tabTitle: "Evalution",
    },
    {
        id: '4',
        tabTitle: "Moves",
    }
]
function PokemonDetails() {
    const { name } = useParams();
    const [data, setData] = useState([]);
    const [pokemonImg, setPokemonImg] = useState('');
    const [bookmarks, setBookmarks] = useState([]);
    const [visibleTab, setVisibleTab] = useState(pokemonTabs[0].id)

    useEffect(() => {
        fetchData();
        getBookmarks();
    }, []);

    const fetchData = async () => {
        const resp = await PokemonService.searchPokemon(name);
        const resImg = await PokemonService.getPokemonImage(resp.id);
        setData(resp);
        console.log(resImg);
        setPokemonImg(resImg);
    };

    const getBookmarks = () => {
        setBookmarks(JSON.parse(localStorage.getItem('bookmarks_data')));
    }
    const setBookmarksData = (name) => {
        const bookmarks_data = { name: name, bookmark: true };
        let bookmark = localStorage.getItem('bookmarks_data');
        bookmark = bookmark ? JSON.parse(bookmark) : [];
        localStorage.setItem("bookmarks_data", JSON.stringify(bookmark));
        bookmarks.push(bookmarks_data);
    }
    const listTitles = pokemonTabs.map((item) =>
        <li onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id ? "tab-title tab-title-active" : "tab-title"}>{item.tabTitle}</li>
    )
    const listContent = pokemonTabs.map((item) => {
        const isVisible = visibleTab === item.id;
        const content = {
            "1": (
                <table>
                    <tbody>
                        <tr>
                            <th>Height</th>
                            <td>70 cm</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>1 KG</td>
                        </tr>
                        <tr>
                            <th>Ability</th>
                            <td>70 cm</td>
                        </tr>
                    </tbody>
                </table>
            ),
            "2": <p>Case 2</p>,
            "3": <p>Case 3</p>,
            "4": <p>Case 4</p>,
        };

        return (
            <div key={item.id} style={isVisible ? {} : { display: 'none' }}>
                {content[item.id] || null}
            </div>
        );
    });



    return (
        <div className='d-flex w-100'>
            <div className='w-25'>
                <img src={pokemonImg} alt={name} />
                <button onClick={() => setBookmarksData(name)}>Book mark</button>
            </div>
            <div className="tabs w-75">
                <ul className="tabs-titles">
                    {listTitles}
                </ul>
                <div className="tab-content">
                    {listContent}
                </div>
            </div>
        </div>)
}

export default PokemonDetails;

