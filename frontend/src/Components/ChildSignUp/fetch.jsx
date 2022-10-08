import React, { useState, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    error: null,
    username: '',
    email: '',
    password: '',
};

function registerReducer(state, action) {
    switch (action.type) {
        case 'SUCCESS': {
            return {
                error: null,
                greeting: action.greeting,
            };
        }
        case 'ERROR': {
            return {
                error: action.error,
                greeting: null,
            };
        }
        default: {
            return state;
        }
    }
}

export default function Fetch({ url }) {
    const [{ error, username, email, password }, dispatch] = useReducer(
        registerReducer,
        initialState
    );
    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchNewUser = async (url) =>
        axios
            .get(url)
            .then((response) => {
                const { data } = response;
                const { username, email, password } = data;
                dispatch({ type: 'SUCCESS', username, email, password });
                setButtonClicked(true);
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', error });
            });

    const buttonText = buttonClicked ? 'Ok' : 'Load new User';

    return (
        <div>
            <button onClick={() => fetchNewUser(url)} disabled={buttonClicked}>
                {buttonText}
            </button>
            {data && <h1>{data}</h1>}
            {error && <p role="alert">Oops, failed to fetch!</p>}
        </div>
    );
}
