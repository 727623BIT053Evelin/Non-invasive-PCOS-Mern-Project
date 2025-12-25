import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../components/AdminNav';
import { Calendar, User, Clock, CheckCircle, XCircle, Search, Filter, Mail, Phone, MapPin } from 'lucide-react';

function AdminAppointments({ user }) {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, Pending, Confirmed, Cancelled
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/appointments/admin/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            alert('Failed to load appointments. Are you an admin?');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`/api/appointments/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAppointments(appointments.map(app =>
                app._id === id ? { ...app, status: response.data.status } : app
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
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

    const filteredAppointments = appointments.filter(app => {
        const matchesFilter = filter === 'all' || app.status === filter;
        const matchesSearch =
            app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.expertId?.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold">Loading consultations...</p>
        </div>
    );

    return (
        <div className="container-standard py-12 min-h-screen">
            <AdminNav />
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Calendar className="text-primary" size={32} />
                        Consultation <span className="text-primary">Manager</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Approve or manage expert booking requests.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by patient or doctor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
                        />
                    </div>
                    <div className="h-6 w-px bg-gray-100 mx-2"></div>
                    {['all', 'Pending', 'Confirmed', 'Cancelled'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {filteredAppointments.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
                        <div className="p-8 bg-gray-50 rounded-full text-gray-300 w-fit mx-auto mb-6">
                            <Calendar size={64} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    filteredAppointments.map(app => (
                        <div key={app._id} className="bg-white border-2 border-gray-50 rounded-[2.5rem] p-8 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-purple-950/5 group">
                            <div className="flex flex-col xl:flex-row justify-between gap-8">
                                <div className="flex-1 space-y-6">
                                    {/* Patient & Status info */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(app.status)}`}>
                                                {app.status}
                                            </span>
                                            <span className="text-xs font-bold text-gray-400">
                                                Requested on {new Date(app.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Patient Info */}
                                        <div className="space-y-4 p-6 bg-gray-50 rounded-3xl">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <User size={12} /> Patient Details
                                            </p>
                                            <div>
                                                <h4 className="text-lg font-black text-gray-900">{app.userName}</h4>
                                                <div className="space-y-1 mt-2">
                                                    <p className="text-xs font-bold text-gray-500 flex items-center gap-2"><Mail size={12} /> {app.userEmail}</p>
                                                    {app.userId?.mobile && <p className="text-xs font-bold text-gray-500 flex items-center gap-2"><Phone size={12} /> {app.userId.mobile}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Specialist Info */}
                                        <div className="space-y-4 p-6 bg-purple-50 rounded-3xl">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                                <Clock size={12} /> Appointment Info
                                            </p>
                                            <div>
                                                <h4 className="text-lg font-black text-gray-900">{app.expertId?.name}</h4>
                                                <p className="text-sm font-bold text-primary">{app.expertId?.specialty}</p>
                                                <div className="flex items-center gap-4 mt-3 text-xs font-black text-gray-700">
                                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {app.date}</span>
                                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {app.timeSlot}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {app.notes && (
                                        <div className="bg-gray-50 p-6 rounded-3xl italic text-sm text-gray-600 font-medium">
                                            "{app.notes}"
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex xl:flex-col items-center justify-center gap-3 xl:w-48">
                                    {app.status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, 'Confirmed')}
                                                className="flex-1 xl:w-full bg-primary text-white py-4 rounded-2xl font-black text-xs shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle size={16} /> Confirm
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, 'Cancelled')}
                                                className="flex-1 xl:w-full bg-rose-50 text-rose-500 py-4 rounded-2xl font-black text-xs hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                                            >
                                                <XCircle size={16} /> Decline
                                            </button>
                                        </>
                                    )}
                                    {app.status === 'Confirmed' && (
                                        <button
                                            onClick={() => handleUpdateStatus(app._id, 'Completed')}
                                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs hover:bg-black transition-all"
                                        >
                                            Mark Completed
                                        </button>
                                    )}
                                    {(app.status === 'Cancelled' || app.status === 'Completed') && (
                                        <p className="text-xs font-bold text-gray-300">No actions available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AdminAppointments;
