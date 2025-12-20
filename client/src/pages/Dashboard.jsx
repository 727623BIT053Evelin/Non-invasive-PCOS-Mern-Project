import { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, History, Calendar, ArrowRight, User, Settings, LogOut, Search, Activity } from 'lucide-react';

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

    return (
        <div className="container-standard py-12 min-h-screen bg-white font-outfit">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 px-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                        <LayoutDashboard className="text-primary" size={32} />
                        Health <span className="text-primary">Dashboard</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Manage your clinical insights and assessments.</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <div className="bg-white p-2 rounded-xl text-primary shadow-sm">
                        <User size={20} />
                    </div>
                    <div className="pr-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in</p>
                        <p className="text-sm font-bold text-gray-900">Patient Portal</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Profile Sidebar */}
                <aside className="lg:col-span-1 space-y-4">
                    <div className="bg-purple-50/50 p-6 rounded-[2rem] border border-purple-100">
                        <p className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-4">Quick Links</p>
                        <nav className="space-y-2 font-bold">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-primary rounded-xl shadow-sm border border-purple-100/50 transition-all">
                                <History size={18} /> History
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white hover:text-gray-600 rounded-xl transition-all group">
                                <Settings size={18} /> Settings
                            </button>
                        </nav>
                    </div>

                    <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white overflow-hidden relative group cursor-pointer shadow-xl shadow-purple-950/10">
                        <div className="absolute top-0 right-0 p-8 text-primary/10">
                            <Calendar size={120} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-black mb-2">Need Help?</h4>
                            <p className="text-sm opacity-60 font-medium mb-6">Talk to our AI health expert for quick answers.</p>
                            <button className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                Launch Chat <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3">
                    <section className="bg-white border-2 border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-purple-950/5 min-h-[500px]">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <History className="text-primary" /> Prediction History
                            </h2>
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                                <Search size={20} />
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="text-gray-400 font-bold animate-pulse">Retrieving your health records...</p>
                            </div>
                        ) : predictions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                                <div className="p-8 bg-purple-50 rounded-full text-primary">
                                    <LayoutDashboard size={64} opacity={0.3} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">No Assessments Yet</h3>
                                    <p className="text-gray-500 font-medium max-w-sm">Take your first PCOS risk assessment to see insights here.</p>
                                </div>
                                <a href="/prediction" className="bg-primary text-white px-8 py-4 rounded-full font-black hover:bg-primary-dark transition-all shadow-lg shadow-purple-500/20 active:scale-95 inline-block">
                                    Start New Assessment
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {predictions.slice().reverse().map((pred, i) => (
                                    <div key={i} className="group p-6 md:p-8 bg-white border border-gray-100 rounded-3xl hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-purple-950/5 relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${pred.prediction === 1 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                        Assessment Date: {new Date(pred.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900">
                                                    {pred.prediction === 1 ? 'PCOS Potential Detected' : 'No PCOS Detected'}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Confidence Score</p>
                                                    <p className="text-2xl font-black text-gray-900">{(pred.probabilities.pcos * 100).toFixed(1)}%</p>
                                                </div>
                                                <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ArrowRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full -mr-16 -mt-16 ${pred.prediction === 1 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
