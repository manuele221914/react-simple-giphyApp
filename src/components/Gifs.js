import React, { useState, useEffect, useCallback } from 'react';
import { fetchBySearchGifs } from '../api/fetch.gif';
import Paginate from './Paginate';

const TrendingCatsDogs = ({ text }) => {
    const [gifs, setGifs] = useState({ data: [] });
    const [loader, setLoader] = useState(true);
    const [isError, setIsError] = useState(false);

    //Set number of elements per page for the pagination component
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPage] = useState(25);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirsItem = indexOfLastItem - itemsPerPage;
    let currentItemsView = gifs.data.slice(indexOfFirsItem, indexOfLastItem);

    const fetchApi = useCallback(
        async () => {
            setLoader(true);
            try {
                const response = await fetchBySearchGifs(text);
                setGifs(response);
                setPageNumber(1)
            } catch (error) {
                console.log(error);
                setIsError(error);
            }
            setLoader(false);
        }
    );
    useEffect(() => {
        fetchApi();
    }, [text]);

    const pageHandler = index => {
        setPageNumber(index)
    }
    //list the specified amount of items for the pagination
    const listItems = currentItemsView.map((item) =>
        <a
            href={item.url}
            target="new"
            key={item.id}
            className="grid-gallery__item">
            <img
                src={item.images.original.url}
                className="grid-gallery__image" />
        </a>
    );
    return (
        <div>
            <Paginate
                pageNumber={pageNumber}
                itemsPerPage={itemsPerPage}
                total={gifs.data.length}
                pageHandler={pageHandler}
            />
            <div className="grid-gallery">
                {loader ? <h2>...loading</h2> : listItems}
            </div>
            {isError && <div>Something went wrong ...</div>}
            <Paginate
                pageNumber={pageNumber}
                itemsPerPage={itemsPerPage}
                total={gifs.data.length}
                pageHandler={pageHandler}
            />
        </div>
    );
};

export default TrendingCatsDogs;