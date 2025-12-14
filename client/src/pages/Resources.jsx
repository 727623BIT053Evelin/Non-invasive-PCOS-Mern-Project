function Resources() {
    return (
        <div className="container py-5">
            <h1 className="text-primary">Lifestyle & Tips for PCOS</h1>
            <p>Consistent daily choices—diet, activity, and self-care—are proven to prevent, reduce, and even reverse PCOS symptoms for many women.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
                <div className="card">
                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🍎</div>
                    <h3 className="text-primary text-center">Healthy Diet</h3>
                    <p>Eat whole grains, high-fiber veggies, lean proteins, and healthy fats. Go easy on sugar, white bread, and fried food.</p>
                </div>

                <div className="card">
                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🚴</div>
                    <h3 className="text-primary text-center">Regular Exercise</h3>
                    <p>Aim for 150+ minutes of moderate activity per week. Try fast walking, swimming, cycling, or dance—consistency is key!</p>
                </div>

                <div className="card">
                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🧘</div>
                    <h3 className="text-primary text-center">Stress Management</h3>
                    <p>Yoga, meditation, or just a mindful walk outdoors can lower androgen levels and symptoms.</p>
                </div>
            </div>

            <div style={{ background: '#FEF3C7', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #F59E0B', marginBottom: '2rem' }}>
                <h3>⚠️ Why act now?</h3>
                <ul>
                    <li>PCOS raises risk for diabetes, high blood pressure, and endometrial cancer.</li>
                    <li>Untreated symptoms can lead to irregular periods, infertility, acne, and excess hair growth.</li>
                    <li>Mental health matters: PCOS is linked to higher risk of anxiety and depression. Manage stress and seek support.</li>
                </ul>
            </div>

            <div className="card">
                <h3 className="text-primary">Advanced PCOS Self-Care Tips</h3>
                <ul>
                    <li>Track your periods and symptoms in a journal/app to understand your cycle patterns.</li>
                    <li>Prioritize 7-9 hours of restful sleep per night for hormonal harmony.</li>
                    <li>Limit processed foods, sweetened drinks, and high-fructose corn syrup.</li>
                    <li>Talk to your doctor before trying supplements like Myo-inositol, Vitamin D, or Omega-3.</li>
                    <li>Build a support system of peers or a PCOS community for shared motivation.</li>
                </ul>
            </div>

            <div style={{ background: '#EDE9FE', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '2rem' }}>
                <p className="text-primary" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    🌱 Every healthy step—no matter how small—moves you closer to your goals. Your journey matters.
                </p>
            </div>
        </div>
    );
}

export default Resources;
