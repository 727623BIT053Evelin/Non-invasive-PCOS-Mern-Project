import { useState } from 'react';
import axios from 'axios';

function Prediction() {
    const [formData, setFormData] = useState({
        ' Age (yrs)': '',
        'Weight (Kg)': '',
        'Height(Cm) ': '',
        'BMI': '',
        'Pulse rate(bpm) ': '',
        'RR (breaths/min)': '',
        'Hb(g/dl)': '',
        'Cycle(R/I)': 1,
        'Cycle length(days)': '',
        'Marraige Status (Yrs)': '',
        'Pregnant(Y/N)': 0,
        'No. of abortions': 0,
        'Weight gain(Y/N)': 0,
        'hair growth(Y/N)': 0,
        'Skin darkening (Y/N)': 0,
        'Hair loss(Y/N)': 0,
        'Pimples(Y/N)': 0,
        'Fast food (Y/N)': 0,
        'Reg.Exercise(Y/N)': 0
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'select-one' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/predictions', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Prediction failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadReport = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `/api/predictions/${result.id}/report`,
                { shapPlot: result.shapPlot },
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                    responseType: 'blob'
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pcos_report_${Date.now()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Failed to generate report');
        }
    };

    return (
        <div className="container py-5">
            <section className="hero" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h1 className="text-primary">PCOS Prediction Assessment</h1>
                <p>Enter your details for a personalized PCOS risk prediction.</p>
            </section>

            {error && (
                <div style={{ padding: '1rem', background: '#FEE2E2', borderRadius: '8px', marginBottom: '1.5rem', color: '#DC2626' }}>
                    {error}
                </div>
            )}

            <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Age (yrs)</label>
                            <input type="number" name=" Age (yrs)" className="form-input" value={formData[' Age (yrs)']} onChange={handleChange} placeholder="e.g. 25" required />
                            <p className="form-helper">10-60 years</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Weight (Kg)</label>
                            <input type="number" name="Weight (Kg)" className="form-input" value={formData['Weight (Kg)']} onChange={handleChange} placeholder="e.g. 55" required />
                            <p className="form-helper">30-150 Kg</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Height (Cm)</label>
                            <input type="number" name="Height(Cm) " className="form-input" value={formData['Height(Cm) ']} onChange={handleChange} placeholder="e.g. 162" required />
                            <p className="form-helper">100-200 cm</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">BMI</label>
                            <input type="number" step="0.1" name="BMI" className="form-input" value={formData['BMI']} onChange={handleChange} placeholder="e.g. 22.3" required />
                            <p className="form-helper">Healthy range 18.5-24.9</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Pulse rate (bpm)</label>
                            <input type="number" name="Pulse rate(bpm) " className="form-input" value={formData['Pulse rate(bpm) ']} onChange={handleChange} placeholder="e.g. 78" required />
                            <p className="form-helper">Normal 60-100 bpm</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">RR (breaths/min)</label>
                            <input type="number" name="RR (breaths/min)" className="form-input" value={formData['RR (breaths/min)']} onChange={handleChange} placeholder="e.g. 16" required />
                            <p className="form-helper">Normal 12-20 breaths/min</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Hb (g/dl)</label>
                            <input type="number" step="0.1" name="Hb(g/dl)" className="form-input" value={formData['Hb(g/dl)']} onChange={handleChange} placeholder="e.g. 13.5" required />
                            <p className="form-helper">Normal (female) 12-15 g/dl</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Menstruation Length (days)</label>
                            <input type="number" name="Cycle length(days)" className="form-input" value={formData['Cycle length(days)']} onChange={handleChange} placeholder="e.g. 5" required />
                            <p className="form-helper">Normal range 3-7 days</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Marriage Status (Yrs)</label>
                            <input type="number" name="Marraige Status (Yrs)" className="form-input" value={formData['Marraige Status (Yrs)']} onChange={handleChange} placeholder="e.g. 3" required />
                            <p className="form-helper">0-20 years</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Cycle (Regular/Irregular)</label>
                            <select name="Cycle(R/I)" className="form-select" value={formData['Cycle(R/I)']} onChange={handleChange}>
                                <option value={1}>Regular</option>
                                <option value={0}>Irregular</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Pregnant (Y/N)</label>
                            <select name="Pregnant(Y/N)" className="form-select" value={formData['Pregnant(Y/N)']} onChange={handleChange}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Weight gain (Y/N)</label>
                            <select name="Weight gain(Y/N)" className="form-select" value={formData['Weight gain(Y/N)']} onChange={handleChange}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Hair growth (Y/N)</label>
                            <select name="hair growth(Y/N)" className="form-select" value={formData['hair growth(Y/N)']} onChange={handleChange}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Skin darkening (Y/N)</label>
                            <select name="Skin darkening (Y/N)" className="form-select" value={formData['Skin darkening (Y/N)']} onChange={handleChange}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Pimples (Y/N)</label>
                            <select name="Pimples(Y/N)" className="form-select" value={formData['Pimples(Y/N)']} onChange={handleChange}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Fast food (Y/N)</label>
                            <select name="Fast food (Y/N)" className="form-select" value={formData['Fast food (Y/N)']} onChange={handleChange}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} disabled={loading}>
                        {loading ? 'Analyzing...' : 'Predict PCOS'}
                    </button>
                </form>

                {result && (
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#FAF5FF', borderRadius: '12px' }}>
                        <h2 className="text-center text-primary">Prediction Result</h2>

                        <div style={{ textAlign: 'center', padding: '1.5rem', background: result.prediction === 1 ? '#FEE2E2' : '#D1FAE5', borderRadius: '8px', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: result.prediction === 1 ? '#DC2626' : '#059669' }}>
                                {result.prediction === 1 ? '⚠️ PCOS Detected' : '✅ No PCOS Detected'}
                            </h3>
                            <p>Probability: {(result.probabilities.pcos * 100).toFixed(1)}%</p>
                        </div>

                        <h3 className="text-primary">Top Contributing Features</h3>
                        <div style={{ marginBottom: '1.5rem' }}>
                            {result.topFeatures.map(([feature, impact], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'white', borderRadius: '8px', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '500' }}>{feature}</span>
                                    <span style={{ color: impact > 0 ? '#DC2626' : '#059669' }}>{impact.toFixed(4)}</span>
                                </div>
                            ))}
                        </div>

                        {result.shapPlot && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 className="text-primary">SHAP Feature Importance Visualization</h3>
                                <img src={`data:image/png;base64,${result.shapPlot}`} alt="SHAP Plot" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block', borderRadius: '8px' }} />
                                <p className="text-gray text-center mt-2" style={{ fontSize: '0.875rem' }}>
                                    This visualization shows which features most influenced your prediction
                                </p>
                            </div>
                        )}

                        <button onClick={downloadReport} className="btn btn-secondary" style={{ width: '100%' }}>
                            📄 Download PDF Report
                        </button>

                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FEF3C7', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                            <p style={{ fontSize: '0.875rem', margin: 0 }}>
                                <strong>Disclaimer:</strong> This assessment is for informational purposes only and does not constitute medical advice.
                                Only a healthcare professional can diagnose PCOS through medical evaluation.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prediction;
