import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">💜 PCOS Care</Link>

                <ul className="navbar-nav">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                    <li><Link to="/prediction" className="nav-link">Prediction</Link></li>
                    <li><Link to="/resources" className="nav-link">Resources</Link></li>
                    <li><Link to="/consultation" className="nav-link">Consultation</Link></li>
                    <li><Link to="/community" className="nav-link">Community</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>

                    {user ? (
                        <>
                            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                            <li>
                                <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Login</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
