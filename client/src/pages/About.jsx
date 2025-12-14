function About() {
    return (
        <div className="container py-5">
            <section className="hero" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h1 className="text-primary">Understanding PCOS</h1>
                <p className="hero-subtitle">
                    Knowledge is power. Learn about PCOS symptoms, causes, risks, and treatment options.
                </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card">
                    <h3 className="text-primary">💡 70% undiagnosed</h3>
                    <p>PCOS is often missed. Early awareness and action matter!</p>
                </div>
                <div className="card">
                    <h3 className="text-primary">🏋️ 5-10% weight loss</h3>
                    <p>Can restart cycles and reduce risk for many women.</p>
                </div>
                <div className="card">
                    <h3 className="text-primary">🌱 Small habits, big change</h3>
                    <p>Start with manageable healthy steps—progress adds up.</p>
                </div>
            </div>

            <section className="mb-4">
                <h2 className="text-primary">Common Symptoms</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[
                        { icon: '📅', title: 'Irregular Periods', desc: 'Fewer than 8 periods per year' },
                        { icon: '😊', title: 'Excess Hair Growth', desc: 'Unwanted facial or body hair' },
                        { icon: '⚖️', title: 'Weight Changes', desc: 'Weight gain or difficulty losing weight' },
                        { icon: '🌸', title: 'Acne & Skin Issues', desc: 'Adult acne, oily skin, or dark patches' },
                        { icon: '💇', title: 'Hair Thinning', desc: 'Thinning hair on the scalp' },
                        { icon: '👶', title: 'Fertility Challenges', desc: 'Difficulty getting pregnant' }
                    ].map((item, i) => (
                        <div key={i} className="card text-center">
                            <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                            <h4 className="text-primary">{item.title}</h4>
                            <p style={{ fontSize: '0.875rem' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-4">
                <h2 className="text-primary">What Causes PCOS?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { icon: '🧬', title: 'Genetic Factors', desc: 'PCOS often runs in families' },
                        { icon: '🔬', title: 'Insulin Resistance', desc: 'Many women have insulin resistance' },
                        { icon: '⚡', title: 'Hormonal Imbalance', desc: 'Elevated androgens interfere with ovulation' },
                        { icon: '🔥', title: 'Inflammation', desc: 'Low-grade inflammation may stimulate polycystic ovaries' }
                    ].map((item, i) => (
                        <div key={i} className="card">
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                            <h4 className="text-primary">{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-4">
                <h2 className="text-primary">Treatment & Management</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card">
                        <h3 style={{ borderLeft: '4px solid #8B5CF6', paddingLeft: '1rem' }}>Lifestyle Changes</h3>
                        <ul>
                            <li>Low-glycemic, high-fiber diet</li>
                            <li>Consistent regular exercise</li>
                            <li>Weight management</li>
                            <li>Stress reduction techniques</li>
                            <li>7-8 hrs quality sleep</li>
                        </ul>
                    </div>
                    <div className="card">
                        <h3 style={{ borderLeft: '4px solid #EC4899', paddingLeft: '1rem' }}>Medical Treatment</h3>
                        <ul>
                            <li>Birth control pills for cycles</li>
                            <li>Metformin for insulin resistance</li>
                            <li>Fertility medications if needed</li>
                            <li>Anti-androgen medications</li>
                            <li>Thyroid and vitamin checks</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section style={{ background: '#FEF3C7', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
                <h3>⚠️ Why pay attention?</h3>
                <ul>
                    <li>Untreated PCOS can lead to diabetes, heart disease, infertility, and endometrial cancer.</li>
                    <li>Managing PCOS today improves daily energy and confidence for tomorrow.</li>
                </ul>
            </section>
        </div>
    );
}

export default About;
