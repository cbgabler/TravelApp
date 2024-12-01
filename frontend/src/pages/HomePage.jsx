import RandomCityButton from '../components/RandomCity';

function HomePage() {
    return (
        <div>
            <header>
                <h1>Travel App</h1>
                <p>This app will track all of your travels. You can edit, add, and delete any posts. Click create posts to start creating a post below.</p>
            </header>
            <div>
                <h1>Click for a random city!</h1>
                <p>Funded by the Overpass API.</p>
                <RandomCityButton />
            </div>
        </div>
    );
}

export default HomePage;
