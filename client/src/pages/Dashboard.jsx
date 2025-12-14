import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/predictions/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setPredictions(response.data);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <div className="container py-5">Loading...</div>;

    return (
        <div className="container py-5">
            <h1 className="text-primary">Your Dashboard</h1>
            <p className="text-gray mb-4">View your prediction history and health records</p>

            {predictions.length === 0 ? (
                <div className="card text-center py-5">
                    <p>No predictions yet. <a href="/prediction" className="text-primary">Take your first assessment</a></p>
                </div>
            ) : (
                <div>
                    {predictions.map((pred, i) => (
                        <div key={i} className="card mb-3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4>{pred.prediction === 1 ? '⚠️ PCOS Detected' : '✅ No PCOS'}</h4>
                                    <p className="text-gray">
                                        {new Date(pred.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p>Probability: {(pred.probabilities.pcos * 100).toFixed(1)}%</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
