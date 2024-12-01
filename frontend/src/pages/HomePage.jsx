import { useEffect, useState } from 'react';
import TravelTable from '../components/TravelTable';
import RandomCityButton from '../components/RandomCity';

function HomePage() {
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
        <div>
            <header>
                <h1>Travel App</h1>
                <p>This app will track all of your travels. You can edit, add, and delete any posts. Click create posts to start creating a post below.</p>
            </header>
            <h2>Travel List</h2>
            <TravelTable travels={travels} />
            <div>
                <h1>Click for a random city!</h1>
                <p>Funded by the Overpass API.</p>
                <RandomCityButton />
            </div>
        </div>
    );
}

export default HomePage;
