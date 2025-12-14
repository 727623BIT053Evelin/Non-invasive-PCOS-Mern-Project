function Community() {
    return (
        <div className="container py-5">
            <h1 className="text-primary">🌸 PCOS Community</h1>
            <p className="text-gray">Connect with others, share your journey, and find support in our inclusive community.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                {[
                    'Diet & Fitness for PCOS',
                    'Ask the Doctor',
                    'Mind & Body Wellness',
                    'Motivation & Stories',
                    'PCOS & Fertility Planning',
                    'Supplements',
                    'Recipes & Meal Plans'
                ].map((group, i) => (
                    <div key={i} className="card text-center">
                        <h4 className="text-primary">{group}</h4>
                        <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>View Group</button>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginTop: '3rem' }}>
                <h3 className="text-primary">Community Feed</h3>
                <p className="text-gray">Share your experiences, ask questions, and support others.</p>
                <button className="btn btn-primary">+ Create Post</button>
            </div>

            <div style={{ background: '#EDE9FE', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ fontStyle: 'italic' }}>
                    "Progress, not perfection. Every step is brave!" 💜
                </p>
            </div>
        </div>
    );
}

export default Community;
