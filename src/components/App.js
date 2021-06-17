import React, { useState } from 'react';
import Search from './Search';
import TrendingCatDog from './Gifs';
import { fetchRandomGif } from '../api/fetch.gif'

const App = () => {
    const [searchText, setSearchState] = useState('');
    const [gif, setGif] = useState({});
    const [loader, setLoader] = useState(true);
    const [isError, setIsError] = useState(false);

    const search = async (searchText) => {
        setIsError(false);
        setLoader(true);
        try {
            const { data } = await fetchRandomGif(searchText);
            const getDetails = {
                image: data.fixed_height_downsampled_url,
                title: data.title,
                gifUrl: data.url
            }
            setGif(getDetails);
            setSearchState(searchText);
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
        setLoader(false);
    };
    //Handle for the cat and dog button
    const handleCatDog = (x) => {
        const catDog = x ? "dog" : "cat"
        setSearchState(catDog)
    }

    return (
        <div className="container">
            <h1>Search GIFs here</h1>
            <Search
                onSearch={search}
            />
            {isError && <div>Something went wrong ...</div>}
            <h2>Cat/Dog GIFs</h2>
            <button
                className="btn"
                onClick={() => handleCatDog(false)}>
                <i class="fas fa-cat"></i>
            </button>
            <button
                className="btn"
                onClick={() => handleCatDog(true)}>
                <i class="fas fa-dog"></i>
            </button >
            <TrendingCatDog
                text={searchText}
            />
        </div>
    );
};

export default App;

