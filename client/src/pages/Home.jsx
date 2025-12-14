import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">
                        Empower Your Health, <span className="highlight">Embrace Your Journey</span>
                    </h1>
                    <p className="hero-subtitle">
                        You are not alone in your PCOS journey. Connect, learn, and take charge with our warm,
                        evidence-based resources and inclusive community.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/prediction" className="btn btn-primary">Take Self-Assessment</Link>
                        <Link to="/about" className="btn btn-secondary">Learn More</Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="container py-5">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🌸</div>
                        <h3 className="feature-title">Personalized PCOS Assessment</h3>
                        <p>Quickly screen your risk and get tailored recommendations.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">👥</div>
                        <h3 className="feature-title">Community Support</h3>
                        <p>Join forums and groups to share stories and find encouragement.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3 className="feature-title">Book Expert Consultation</h3>
                        <p>Find gynecologists, nutritionists, and therapists instantly.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💬</div>
                        <h3 className="feature-title">24/7 Care Guidance</h3>
                        <p>Get self-care resources and answers to your PCOS questions anytime.</p>
                    </div>
                </div>
            </section>

            {/* PCOS Awareness */}
            <section style={{ background: 'linear-gradient(135deg, #000000 0%, #581c87 100%)', padding: '3rem 0', color: 'white' }}>
                <div className="container text-center">
                    <h2>PCOS Awareness</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        <div>
                            <h1>70%</h1>
                            <p>Women undiagnosed</p>
                        </div>
                        <div>
                            <h1>50%</h1>
                            <p>Can manage with lifestyle</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container py-5 text-center">
                <h2 className="text-primary">Have Questions or Need Help?</h2>
                <p className="text-gray mb-3">We're here for you. Reach out anytime for support or feedback!</p>
                <p>📧 Email: support@pcoscare.org</p>
                <p>📞 Phone: +91 98765 43210</p>
                <p>📍 Location: Tiruppur, Tamil Nadu</p>
            </section>
        </div>
    );
}

export default Home;
