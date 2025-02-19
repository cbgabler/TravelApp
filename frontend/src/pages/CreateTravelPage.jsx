import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreateTravelPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !text || !date || !location) {
            alert('All fields are required.');
            return;
        }

        const travel = {
            title: title.trim(),
            text: text.trim(),
            date,
            location : location.trim(),
        };

        try {
            const response = await fetch('http://localhost:3000/travels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travel),
            });

            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(`Validation error: ${errorData.Error}`);
            }

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const result = await response.json();
            console.log('Travel post created:', result);
            alert('Travel post created successfully!');
            navigate('/posts');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className="homepage">
            <div className="create-travel-container">
                <h1>Create Travel Post</h1>
                <form onSubmit={handleSubmit} className="create-travel-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        required
                    />
                    
                    <label htmlFor="text">Text:</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="input-field"
                        required
                    />
                    
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input-field"
                        required
                    />

                    <label htmlFor="location">Location:</label>
                    <input
                        type="location"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input-field"
                        required
                    />
                    
                    <button type="submit" className="button">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTravelPage;
