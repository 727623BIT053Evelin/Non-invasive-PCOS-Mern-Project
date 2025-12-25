import { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, History, Calendar, ArrowRight, User, Settings, LogOut, Search, Activity, CheckCircle, Clock, XCircle, FileDown } from 'lucide-react';

function Dashboard() {
    const [predictions, setPredictions] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('history'); // history, appointments

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [predRes, appRes] = await Promise.all([
                    axios.get('/api/predictions/history', { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get('/api/appointments/my', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                setPredictions(predRes.data);
                setAppointments(appRes.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDownloadReport = async (predictionId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `/api/predictions/${predictionId}/report`,
                {},
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                    responseType: 'blob'
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pcos_report_${new Date().getTime()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error downloading report:', err);
            alert('Failed to generate report');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-600';
            case 'Cancelled': return 'bg-rose-100 text-rose-600';
            case 'Completed': return 'bg-blue-100 text-blue-600';
            default: return 'bg-amber-100 text-amber-600';
        }
    };

    return (
        <div className="container-standard py-12 min-h-screen font-outfit">
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
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-white text-primary shadow-sm border border-purple-100/50' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <History size={18} /> History
                            </button>
                            <button
                                onClick={() => setActiveTab('appointments')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-white text-primary shadow-sm border border-purple-100/50' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Calendar size={18} /> Appointments
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white hover:text-gray-600 rounded-xl transition-all group">
                                <Settings size={18} /> Settings
                            </button>
                        </nav>
                    </div>

                    <div className="p-8 bg-primary rounded-[2.5rem] text-white overflow-hidden relative group cursor-pointer shadow-xl shadow-purple-950/10 transition-all hover:bg-primary-dark">
                        <div className="absolute top-0 right-0 p-8 text-white/10">
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-black mb-2">Need Help?</h4>
                            <p className="text-sm opacity-80 font-medium mb-6">Talk to our medical experts for personalized care.</p>
                            <a href="/consultation" className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                Book Now <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3">
                    <section className="bg-white border-2 border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-purple-950/5 min-h-[500px]">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                {activeTab === 'history' ? (
                                    <><History className="text-primary" /> Prediction History</>
                                ) : (
                                    <><Calendar className="text-primary" /> My Consultations</>
                                )}
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="text-gray-400 font-bold animate-pulse">Retrieving your records...</p>
                            </div>
                        ) : activeTab === 'history' ? (
                            predictions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                                    <div className="p-8 bg-purple-50 rounded-full text-primary">
                                        <Activity size={64} opacity={0.3} />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">No Assessments Yet</h3>
                                    <a href="/prediction" className="bg-primary text-white px-8 py-4 rounded-full font-black hover:bg-primary-dark transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                                        Start Assessment
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {predictions.map((pred, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleDownloadReport(pred._id || pred.id)}
                                            className="group p-6 md:p-8 bg-white border border-gray-100 rounded-3xl hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-purple-950/5 relative overflow-hidden cursor-pointer"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded-full ${pred.prediction === 1 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                            {new Date(pred.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary transition-colors flex items-center gap-3">
                                                        {pred.prediction === 1 ? 'PCOS Potential Detected' : 'No PCOS Detected'}
                                                        <FileDown size={18} className="text-primary/50 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Confidence</p>
                                                    <p className="text-2xl font-black text-gray-900">{(pred.probabilities.pcos * 100).toFixed(1)}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        ) : (
                            // Appointments Tab
                            appointments.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                                    <div className="p-8 bg-purple-50 rounded-full text-primary">
                                        <Calendar size={64} opacity={0.3} />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">No Appointments</h3>
                                    <a href="/consultation" className="bg-primary text-white px-8 py-4 rounded-full font-black hover:bg-primary-dark transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                                        Book Specialist
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {appointments.map((app) => (
                                        <div key={app._id} className="p-6 md:p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-primary">
                                                        <User size={32} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-gray-900">{app.expertId?.name || 'Specialist'}</h3>
                                                        <p className="text-sm font-bold text-primary">{app.expertId?.specialty}</p>
                                                        <div className="flex items-center gap-3 mt-2 text-xs font-bold text-gray-400">
                                                            <span className="flex items-center gap-1"><Calendar size={12} /> {app.date}</span>
                                                            <span className="flex items-center gap-1"><Clock size={12} /> {app.timeSlot}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                    {app.status === 'Pending' && (
                                                        <p className="text-[10px] text-gray-400 font-bold italic">Awaiting clinical approval</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
