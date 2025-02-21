import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function SinglePost({ travel }) {
    
    const [value, setValue] = useState(0);

    const incValue = () => {
        setValue(value + 1)
    }

    return (
        <div className="homepage">
            <div>
                <h2>{travel.title}</h2>
                <p>{travel.date}</p>
                <p>{travel.text}</p>
                <button onClick={() => incValue()}>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>{value}</p>
                </button>
            </div>
        </div>
    );
}

export default SinglePost;
