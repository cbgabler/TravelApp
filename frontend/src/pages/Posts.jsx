import React, { useEffect, useState } from 'react';
import TravelTable from '../components/TravelTable';
import '../App.css';

function Posts() {
    const [travels, setTravels] = useState([]);
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

    const togglePostVisibility = (id) => {
        setExpandedPostId(expandedPostId === id ? null : id); // Toggle post visibility
    };

    return (
        <div className="homepage">
            <div className="posts-card">
                <h2>Posts</h2>
                {travels.map((travel) => (
                    <div key={travel.id} className="post">
                        <h3>{travel.title}</h3>
                        <button onClick={() => togglePostVisibility(travel.id)}>
                            {expandedPostId === travel.id ? 'Hide' : 'Show'} Details
                        </button>
                        {expandedPostId === travel.id && (
                            <div className="post-details">
                                <p>{travel.content}</p> {/* Assuming content is the full post */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
