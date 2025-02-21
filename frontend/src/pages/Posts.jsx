import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TravelTable from '../components/TravelTable';
import TravelRow from '../components/TravelRow';
import SinglePost from '../components/SinglePost';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../App.css';

function Posts() {
    const navigate = useNavigate();

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
        setExpandedPost_id(expandedPost_id === id ? null : id);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/travels/${selectedTravel._id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                alert('Travel deleted successfully!');
                window.location.reload();
            } else {
                alert('Failed to delete travel.');
            }
        } catch (error) {
            console.error('Error deleting travel:', error);
            alert('An error occurred while deleting the travel.');
        }
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
                            <div>
                                <SinglePost travel={selectedTravel} />
                                <FaEdit onClick={() => navigate(`/edit/${selectedTravel._id}`)} /> {}
                                <FaTrash onClick={handleDelete} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
