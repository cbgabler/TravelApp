import React from 'react';
import { useEffect, useState } from 'react';
import TravelTable from '../components/TravelTable';

function Posts () {
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const response = await fetch('http://localhost:3000/travels');
                const data = await response.json();
                setTravels(data);
            } catch (err) {
                console.error('Error fetching travels:', err);
            }
        };

        fetchTravels();
    }, []);

    return (
        <div>
            <h2>Travel List</h2>
            <TravelTable travels={travels} />
        </div>
    )
}

export default Posts;