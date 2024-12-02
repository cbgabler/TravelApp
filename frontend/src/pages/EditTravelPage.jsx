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

        if (!title || !text || !date) {
            alert('All fields are required to update the travel.');
            return;
        }

        const updatedTravel = { title, text, date };

        try {
            const response = await fetch(`http://localhost:3000/travels/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTravel),
            });

            if (response.ok) {
                alert('Travel updated successfully!');
                navigate('/');
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
            <h2>Edit Travel</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Text:
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Date (MM-DD-YY):
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditTravelPage;
