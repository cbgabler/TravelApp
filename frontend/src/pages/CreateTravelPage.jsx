import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTravelPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!title || !text || !date) {
            alert('All fields are required.');
            return;
        }

        const travel = {
            title: title.trim(),
            text: text.trim(),
            date,
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
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Create Travel Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreateTravelPage;