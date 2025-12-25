import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

function Navbar({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinkStyles = ({ isActive }) =>
        `transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

    const mobileNavLinkStyles = ({ isActive }) =>
        `block py-2 transition-colors ${isActive ? 'text-primary font-bold border-l-4 border-primary pl-3' : 'text-gray-600 pl-3'}`;

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container-standard flex items-center justify-between h-20">
                <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
                    PCOS<span className="text-gray-900">Care</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8 font-medium">
                    <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
                    <li><NavLink to="/prediction" className={navLinkStyles}>Prediction</NavLink></li>
                    <li><NavLink to="/resources" className={navLinkStyles}>Resources</NavLink></li>
                    <li><NavLink to="/consultation" className={navLinkStyles}>Consultation</NavLink></li>
                    <li><NavLink to="/community" className={navLinkStyles}>Community</NavLink></li>
                    <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>

                    {user ? (
                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-100">
                            {user.role === 'admin' && (
                                <li>
                                    <NavLink to="/admin/messages" className={navLinkStyles}>
                                        Admin Panel
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/dashboard" className={({ isActive }) =>
                                    `font-bold transition-colors ${isActive ? 'text-primary' : 'text-gray-900 hover:text-primary'}`
                                }>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center gap-2 bg-gray-50 text-gray-700 font-semibold py-2 px-5 rounded-full hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 active:scale-95"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </li>
                        </div>
                    ) : (
                        <li>
                            <Link to="/login" className="bg-primary text-white py-2.5 px-8 rounded-full font-bold hover:bg-primary-dark transition-all shadow-md active:scale-95 inline-block">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
                    <ul className="flex flex-col p-6 gap-4 font-medium">
                        <li><NavLink to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkStyles}>Home</NavLink></li>
                        <li><NavLink to="/prediction" onClick={() => setIsOpen(false)} className={mobileNavLinkStyles}>Prediction</NavLink></li>
                        <li><NavLink to="/resources" onClick={() => setIsOpen(false)} className={mobileNavLinkStyles}>Resources</NavLink></li>
                        <li><NavLink to="/consultation" onClick={() => setIsOpen(false)} className={mobileNavLinkStyles}>Consultation</NavLink></li>
                        <li><NavLink to="/community" onClick={() => setIsOpen(false)} className={mobileNavLinkStyles}>Community</NavLink></li>
                        <li><NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) =>
                            `block py-2 border-b border-gray-50 pb-2 transition-colors pl-3 ${isActive ? 'text-primary font-bold border-l-4 border-primary' : 'text-gray-600'}`
                        }>Contact</NavLink></li>

                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <li>
                                        <NavLink to="/admin/messages" onClick={() => setIsOpen(false)} className={mobileNavLinkStyles}>
                                            Admin Panel
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={({ isActive }) =>
                                        `block py-2 font-bold transition-colors pl-3 ${isActive ? 'text-primary border-l-4 border-primary' : 'text-gray-900'}`
                                    }>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { onLogout(); setIsOpen(false); }}
                                        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-xl transition-all"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center bg-primary text-white py-3 rounded-xl font-bold block">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
