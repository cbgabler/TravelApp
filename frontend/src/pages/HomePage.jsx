import RandomCityButton from '../components/RandomCity';

function HomePage() {
    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Travel App</h1>
                <p>
                    This app will track all of your travels. You can edit, add, and delete any posts. 
                    Click "Create Posts" to start creating a post below.
                </p>
            </header>
            <div className="homepage-card">
                <h2>Click for a random city!</h2>
                <p>Funded by the Overpass API.</p>
                <div className="homepage-button">
                    <RandomCityButton />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
