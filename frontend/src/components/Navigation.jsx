import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/navbar.css';

function Navigation() {
    useEffect(() => {
        // Dynamically add the Google CSE script
        const script = document.createElement('script');
        script.src = 'https://cse.google.com/cse.js?cx=1148c6b6dd2f64ff4';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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
            </ul>
            {/* Google CSE Search Bar */}
            <div className="gcse-search"></div>
        </nav>
    );
}

export default Navigation;
