import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateTravelPage from './pages/CreateTravelPage';
import EditTravelPage from './pages/EditTravelPage';
import Navigation from './components/Navigation';

function App() {
    return (
        <Router>
            <div>
                <header>
                    <h1>Travel App</h1>
                    <p>This app will track all of your travels. You can edit, add, and delete any posts. Click create posts to start creating a post below.</p>
                </header>
                <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreateTravelPage />} />
                        <Route path="/edit/:id" element={<EditTravelPage />} />
                    </Routes>
                </main>
                <footer>
                    <p>© 2024 Carson Gabler</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
