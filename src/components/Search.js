import PropTypes from "prop-types";
import React, { useState } from 'react';

//search gift by input
const Search = ({ onSearch }) => {

    const [value, setValue] = useState(0);
    const [errValue, setErrValue] = useState('');

    const handleKeyUp = event => {
        if (errValue !== '') setErrValue('');
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();
            if (value.length > 2) {
                onSearch(value);
                setErrValue('')
            } else {
                setErrValue('Too short, add more')
            };
            //Clearing the input after the search
            event.currentTarget.value = "";
        };
    };

    return (
        <div className="search-container">
            <input type="text"
                onChange={e => setValue(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Search GIFs"
                className="input-field"
            />
            <span>{errValue}</span>
        </div>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func
};

export default Search