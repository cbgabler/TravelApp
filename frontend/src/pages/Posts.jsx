import React, { useEffect, useState } from 'react';
import TravelTable from '../components/TravelTable';
import TravelRow from '../components/TravelRow';
import SinglePost from '../components/SinglePost';
import '../App.css';

function Posts() {
    const [travels, setTravels] = useState([]);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [expandedPost_id, setExpandedPost_id] = useState(null);  

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

    const fetchTravelByID = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/travels/${id}`);
            const data = await response.json();
            setSelectedTravel(data);
        } catch (err) {
            console.error('Error fetching travel by ID:', err);
        }
    };

    useEffect(() => {
        if (expandedPost_id) {
            fetchTravelByID(expandedPost_id);
        } else {
            setSelectedTravel(null);
        }
    }, [expandedPost_id]);

    const togglePostVisibility = (id) => {
        console.log(id)
        setExpandedPost_id(expandedPost_id === id ? null : id);
    };

    return (
        <div className="homepage">
            <div className="posts-card">
                <h2>Posts</h2>
                {travels.map((travel) => (
                    <div key={travel._id} className="post">
                        <button onClick={() => togglePostVisibility(travel._id)}>
                            {expandedPost_id === travel._id ? 'Hide' : 'Show'} {travel.title} 
                        </button>
                        {expandedPost_id === travel._id && selectedTravel && (
                            <SinglePost travel={selectedTravel} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
