import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-purple-50/50 border-t border-purple-100 pt-16 pb-8 mt-auto font-outfit">
            <div className="container-standard">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Brand & Description */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary">
                            <h4 className="text-2xl font-black tracking-tight">PCOS <span className="opacity-80">Care</span></h4>
                        </div>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                            Empowering women with non-invasive AI-driven PCOS detection and comprehensive wellness resources.
                            Your holistic journey to health begins with precision.
                        </p>
                    </div>

                    {/* Quick & Clinical Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">Platform</h5>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors font-bold text-sm">Home</Link></li>
                                <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors font-bold text-sm">Our Mission</Link></li>
                                <li><Link to="/prediction" className="text-gray-400 hover:text-primary transition-colors font-bold text-sm">Assessment</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">Resources</h5>
                            <ul className="space-y-3">
                                <li><Link to="/resources" className="text-gray-400 hover:text-primary transition-colors font-bold text-sm">Health Guides</Link></li>
                                <li><Link to="/community" className="text-gray-400 hover:text-primary transition-colors font-bold text-sm">Community</Link></li>
                                <li><Link to="/consultation" className="text-gray-400 hover:text-primary transition-colors font-bold text-sm">Consultation</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact & Location */}
                    <div className="space-y-6">
                        <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest text-center lg:text-left">Get in Touch</h5>
                        <ul className="space-y-4 group">
                            <li className="flex items-center gap-3 text-gray-500 justify-center lg:justify-start">
                                <span className="p-2 bg-white rounded-lg shadow-sm text-primary border border-purple-50"><Mail size={16} /></span>
                                <span className="text-sm font-bold">support@pcoscare.org</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 justify-center lg:justify-start">
                                <span className="p-2 bg-white rounded-lg shadow-sm text-primary border border-purple-50"><Phone size={16} /></span>
                                <span className="text-sm font-bold">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 justify-center lg:justify-start">
                                <span className="p-2 bg-white rounded-lg shadow-sm text-primary border border-purple-50"><MapPin size={16} /></span>
                                <span className="text-sm font-bold">Tiruppur, Tamil Nadu</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} PCOS Care. <span className="text-primary/50">Clinical Data Security Guaranteed.</span>
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="text-xs font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest inline-flex items-center gap-1">
                            Privacy <ExternalLink size={12} />
                        </button>
                        <button className="text-xs font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest inline-flex items-center gap-1">
                            Terms <ExternalLink size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
