import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--bg-white)', padding: '3rem 0', marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>

                    {/* Brand & Description */}
                    <div style={{ flex: '1 1 300px' }}>
                        <h4 className="text-primary" style={{ marginBottom: '1rem' }}>PCOS Care</h4>
                        <p className="text-gray">
                            Empowering women with non-invasive PCOS detection and comprehensive care resources.
                            Your journey to health starts here.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div style={{ flex: '1 1 200px' }}>
                        <h5 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Quick Links</h5>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <Link to="/" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>Home</Link>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <Link to="/about" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>About Us</Link>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <Link to="/prediction" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>Self Assessment</Link>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <Link to="/resources" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>Resources</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div style={{ flex: '1 1 200px' }}>
                        <h5 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Contact Us</h5>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-gray)' }}>
                            <li style={{ marginBottom: '0.5rem' }}>📧 support@pcoscare.org</li>
                            <li style={{ marginBottom: '0.5rem' }}>📞 +91 98765 43210</li>
                            <li style={{ marginBottom: '0.5rem' }}>📍 Tiruppur, Tamil Nadu</li>
                        </ul>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} PCOS Care. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
