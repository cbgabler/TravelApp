import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CreateTravelPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0});
    const [msg, setMsg] = useState(null);
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

    function handleUpload() {
        if(!file) {
            setMsg('No file selected.')
            return;
        }

        const fd = new FormData();
        fd.append('file', file);

        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true}
        })

        // Post fd data to httpbin for multi-files
        // This is a mock post request. Will be changed to actually store files
        axios.post('http://httpbin.org/post', fd, {
            // Every time http bin progresses, onUploadProgress updates with the current percentage
            onUploadProgress: (progressEvent) => {
                return { ...prevState, pc: progressEvent.progress*100 }
            }
            
        })
        .then(res => {
            setMsg('Upload successful');
            console.log(res.data);
        })
        .catch(err => {
            setMsg('Upload failed');
            console.log(err);
        })
    }

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
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input-field"
                        required
                    />
                    <button type="submit" className="button">Create Post</button>
                </form>
                <div className="upload-section">
                    <label htmlFor="imgFile">Image:</label>
                    <input
                        type="file"
                        id="imgFile"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type="button" onClick={handleUpload} className="button">Upload</button>
                </div>
                { progress.started && <progress max="100" value={ progress.pc }></progress>}
                { msg && <span>{ msg }</span>}
            </div>
        </div>
    );
};

export default CreateTravelPage;
