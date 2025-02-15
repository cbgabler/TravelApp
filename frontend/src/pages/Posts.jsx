import React, { useEffect, useState } from 'react';
import TravelTable from '../components/TravelTable';
import TravelRow from '../components/TravelRow';
import SinglePost from '../components/SinglePost';
import '../App.css';

function Posts() {
    const [travels, setTravels] = useState([]);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [expandedPostId, setExpandedPostId] = useState(null);  // State to track expanded post

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
            const response = await fetch('http://localhost:3000/travels/${id}');
            const data = await response.json();
            setSelectedTravel(data);
            console(data)
        } catch (err) {
            console.error('Error fetching travel by ID', err);
        }
    };

    useEffect(() => {
        if (expandedPostId) {
            fetchTravelByID(expandedPostId);
        } else {
            setSelectedTravel(null);
        }
    }, [expandedPostId]);

    const togglePostVisibility = (id) => {
        setExpandedPostId(expandedPostId === id ? null : id); 
    };

    return (
        <div className="homepage">
            <div className="posts-card">
                <h2>Posts</h2>
                {travels.map((travel) => (
                    <div key={travel._id} className="post">
                        <button onClick={ () => togglePostVisibility(travel._id)}>
                            {expandedPostId === travel._id ? 'Hide' : 'Show'} {travel.title} 
                        </button>
                        {expandedPostId === travel._id && (
                            <div className="post-details">
                                <TravelTable travels={travels} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
