import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isAdminLogin, setIsAdminLogin] = useState(false);
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

            if (isAdminLogin && !response.data.user.isAdmin) {
                setError('Access denied. You are not an admin.');
                setLoading(false);
                return;
            }

            onLogin(response.data.user, response.data.token);
            navigate(isAdminLogin ? '/admin/messages' : '/dashboard');
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
                    <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                        Welcome <span className="text-primary text-3xl opacity-90">Back</span>
                    </h1>

                </section>

                <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-purple-950/5 relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 blur-3xl -mr-16 -mt-16 rounded-full pointer-events-none"></div>

                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 mb-6 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={18} className="shrink-0" />
                            <p className="text-xs font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold placeholder:text-gray-300 placeholder:font-medium"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold placeholder:text-gray-300 placeholder:font-medium"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Admin Toggle */}
                        <div
                            onClick={() => setIsAdminLogin(!isAdminLogin)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 group ${isAdminLogin
                                    ? 'border-primary bg-purple-50'
                                    : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${isAdminLogin ? 'bg-primary' : 'bg-gray-200'}`}>
                                <div className={`w-3 h-3 rounded-full bg-white absolute top-1 transition-all ${isAdminLogin ? 'left-6' : 'left-1'}`} />
                            </div>
                            <h4 className={`font-bold text-xs ${isAdminLogin ? 'text-primary' : 'text-gray-500'}`}>Login as Admin</h4>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3.5 rounded-full font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-purple-500/10 active:scale-[0.98] mt-2 ${loading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-dark shadow-purple-500/20'
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                        <p className="text-gray-500 font-medium text-xs">
                            Don't have an account?
                            <Link to="/register" className="ml-2 text-primary font-black hover:text-primary-dark transition-colors inline-flex items-center gap-1 group">
                                Create one <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
