import axios from 'axios';

const URL = 'http://api.giphy.com/v1/gifs/';

/*You normally don't want to pass the key without a .env variable or similar,
but for make the test easier for everyone, I will pass it like this*/
const KEY = 'iw0VF8kyy21y9EAz7COGZV5Io2jBUys9';

// random gif
export const fetchRandomGif = async (name) => {
    const { data } = await axios.get(URL + 'random', {
        params: {
            tag: name,
            api_key: KEY
        }
    });

    return data;
};

//Fetch method for simple search or cats/dogs
export const fetchBySearchGifs = async (name) => {
    const { data } = await axios.get(URL + 'search', {
        params: {
            q: name,
            limit: 50,
            api_key: KEY
        }
    });
    return data;
};