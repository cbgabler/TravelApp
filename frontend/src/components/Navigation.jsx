import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navigation() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/posts" className="navbar-link">Posts</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="navbar-link">Create Post</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/signin" className="navbar-link">Sign In</Link>
                </li>
                <input type="text" className="navbar-search" placeholder='Search...' />
            </ul>
        </nav>
    );
}

export default Navigation;
