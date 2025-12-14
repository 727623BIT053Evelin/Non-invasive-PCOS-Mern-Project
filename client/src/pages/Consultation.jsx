function Consultation() {
    return (
        <div className="container py-5">
            <h1 className="text-primary text-center">Expert Help & Consultation</h1>
            <p className="text-center text-gray mb-4">
                Connect with certified gynecologists, endocrinologists, and nutritionists specializing in PCOS management.
            </p>

            <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h3>Find a Specialist</h3>
                <form>
                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input type="text" className="form-input" placeholder="City or Zip Code" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Specialty</label>
                        <select className="form-select">
                            <option>Gynecologist</option>
                            <option>Endocrinologist</option>
                            <option>Nutritionist</option>
                            <option>Therapist</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Search Experts</button>
                </form>
            </div>

            <div style={{ background: '#EDE9FE', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '3rem' }}>
                <p style={{ fontSize: '0.875rem' }}>
                    <strong>Note:</strong> This is for informational purposes only. Always consult your healthcare provider before starting any new treatment.
                </p>
            </div>
        </div>
    );
}

export default Consultation;
