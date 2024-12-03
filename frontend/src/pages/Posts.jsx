import React, { useEffect, useState } from 'react';
import TravelTable from '../components/TravelTable';
import '../App.css';

function Posts() {
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
        <div className="homepage">
            <div className="posts-card">
                <h2>Posts</h2>
                <TravelTable travels={travels} />
            </div>
        </div>
    );
}

export default Posts;
