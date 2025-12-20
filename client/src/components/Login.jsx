import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', formData);
            onLogin(response.data.user, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-standard py-12 min-h-[80vh] flex flex-col items-center justify-center bg-white font-outfit">
            <div className="w-full max-w-[480px]">
                <section className="text-center mb-10">
                    <div className="bg-purple-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
                        <LogIn size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                        Welcome <span className="text-primary text-3xl opacity-90">Back</span>
                    </h1>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-[320px] mx-auto">
                        Your health journey continues. Please sign in to your safe portal.
                    </p>
                </section>

                <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-purple-950/5 relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 blur-3xl -mr-16 -mt-16 rounded-full pointer-events-none"></div>

                    {error && (
                        <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 mb-8 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={20} className="shrink-0" />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-5 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold placeholder:text-gray-300 placeholder:font-medium"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-5 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold placeholder:text-gray-300 placeholder:font-medium"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-5 rounded-full font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-purple-500/10 active:scale-[0.98] mt-4 ${loading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-dark shadow-purple-500/20'
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                        <p className="text-gray-500 font-medium">
                            Don't have an account?
                            <Link to="/register" className="ml-2 text-primary font-black hover:text-primary-dark transition-colors inline-flex items-center gap-1 group">
                                Create one <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
