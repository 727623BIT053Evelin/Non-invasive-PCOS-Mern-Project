import { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, ExternalLink, RefreshCw, AlertCircle, MessageSquare } from 'lucide-react';
import axios from 'axios';
import AdminNav from '../components/AdminNav';

function AdminMessages({ user }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, new, replied

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/contact', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages. Are you an admin?');
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (msg) => {
        // Open default mail client
        window.location.href = `mailto:${msg.email}?subject=Re: ${msg.subject}&body=Hi ${msg.name},\n\nRegarding your message:\n"${msg.message}"\n\n[Your Reply Here]`;

        // Automatically update status to 'replied'
        // We use a small timeout to ensure the mailto link has time to trigger before state updates potentially cause re-renders
        setTimeout(() => {
            updateStatus(msg._id, 'replied');
        }, 500);
    };

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`/api/contact/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessages(messages.map(m => m._id === id ? response.data : m));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/contact/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(messages.filter(m => m._id !== id));
        } catch (err) {
            console.error('Error deleting message:', err);
            alert('Failed to delete message');
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === 'all') return true;
        return msg.status === filter;
    });

    if (loading) return <div className="p-12 text-center text-gray-500">Loading messages...</div>;
    if (error) return <div className="p-12 text-center text-red-500 font-bold">{error}</div>;

    return (
        <div className="container-standard py-12 min-h-screen">
            <AdminNav />
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <MessageSquare className="text-primary" size={32} />
                        Admin <span className="text-primary">Inbox</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage user inquiries and support tickets.</p>
                </div>
                <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                    {['all', 'new', 'replied'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {filteredMessages.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center border dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Mail size={24} />
                    </div>
                    <p className="text-gray-500 font-medium">No messages found in this category.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredMessages.map(msg => (
                        <div
                            key={msg._id}
                            className={`bg-white p-6 rounded-[2rem] border transition-all hover:shadow-lg group ${msg.status === 'new' ? 'border-primary/30 shadow-md bg-purple-50/10' : 'border-gray-100 opacity-80'
                                }`}
                        >
                            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${msg.status === 'new' ? 'bg-green-100 text-green-600' :
                                            msg.status === 'replied' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {msg.status}
                                        </span>
                                        <span className="text-sm text-gray-400 font-medium">
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{msg.subject}</h3>
                                        <p className="text-sm text-gray-500 font-medium">From: <span className="text-gray-900">{msg.name}</span> &lt;{msg.email}&gt;</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 text-sm leading-relaxed font-medium">
                                        {msg.message}
                                    </div>
                                </div>

                                <div className="flex lg:flex-col gap-2 w-full lg:w-auto">
                                    <button
                                        onClick={() => handleReply(msg)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 hover:translate-y-[-2px] transition-all active:scale-95"
                                    >
                                        <ExternalLink size={16} /> Reply
                                    </button>

                                    {msg.status === 'new' && (
                                        <button
                                            onClick={() => updateStatus(msg._id, 'read')}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                                        >
                                            <CheckCircle size={16} /> Mark Read
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-rose-50 text-rose-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-rose-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminMessages;
