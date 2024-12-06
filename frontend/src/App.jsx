import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateTravelPage from './pages/CreateTravelPage';
import EditTravelPage from './pages/EditTravelPage';
import Posts from './pages/Posts';
import Navigation from './components/Navigation';
import SignIn from './pages/SignIn';
import './App.css';

function App() {
    return (
        <Router>
            <div>
            <Navigation />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/posts/" element={<Posts />} />
                        <Route path="/create" element={<CreateTravelPage />} />
                        <Route path="/edit/:id" element={<EditTravelPage />} />
                        <Route path="/signin" elemenet={<SignIn />} />
                    </Routes>
                </main>
                <footer className='footer'>
                    <p>© 2024 Carson Gabler</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
