import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Consultation from './pages/Consultation';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import AdminMessages from './pages/AdminMessages';
import AdminAppointments from './pages/AdminAppointments';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token with backend
            fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        setUser(data.user);
                    } else {
                        localStorage.removeItem('token');
                    }
                })
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogin = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    if (loading) {
        return <div className="container text-center py-5">Loading...</div>;
    }

    return (
        <Router>
            <div className="app-box">
                <Navbar user={user} onLogout={handleLogout} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/consultation" element={<Consultation user={user} />} />
                    <Route path="/community" element={<Community user={user} />} />

                    <Route
                        path="/login"
                        element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/dashboard" /> : <Register onRegister={handleLogin} />}
                    />

                    <Route
                        path="/prediction"
                        element={
                            <PrivateRoute user={user}>
                                <Prediction user={user} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute user={user}>
                                <Dashboard user={user} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/messages"
                        element={
                            <PrivateRoute user={user}>
                                <AdminMessages user={user} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/appointments"
                        element={
                            <PrivateRoute user={user}>
                                <AdminAppointments user={user} />
                            </PrivateRoute>
                        }
                    />
                </Routes>

                <Footer />
            </div>

            {/* AI Chatbot - appears on all pages */}
            <AIChatbot />
        </Router>
    );
}

export default App;
