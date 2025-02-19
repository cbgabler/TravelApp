import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function EditTravelPage() {
    const { id } = useParams();
    const [travel, setTravel] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/travels/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setTravel(data);
                setTitle(data.title);
                setText(data.text);
                setDate(data.date);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                alert('Error loading data');
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !text || !date || !location) {
            alert('All fields are required to update the travel.');
            return;
        }

        const updatedTravel = { title, text, date, location };

        try {
            const response = await fetch(`http://localhost:3000/travels/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTravel),
            });

            if (response.ok) {
                alert('Travel updated successfully!');
                navigate('/posts');
            } else {
                const errorData = await response.json();
                alert(`Failed to update travel: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating travel:', error);
            alert('An error occurred while updating the travel.');
        }
    };

    if (!travel) return <div>Loading...</div>;

    return (
        <div className="homepage">
            <div className="edit-travel-container">
                <h2>Edit Travel</h2>
                <form onSubmit={handleSubmit} className="edit-travel-form">
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
                        type="text"
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
                    
                    <button type="submit" className="button">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditTravelPage;
