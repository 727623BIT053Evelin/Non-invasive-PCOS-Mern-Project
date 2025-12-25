import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.placeholder.toLowerCase().includes('name') ? 'name' : e.target.type === 'email' ? 'email' : e.target.placeholder.toLowerCase().includes('help') ? 'subject' : 'message']: e.target.value });
    };

    // Better to use explicit names for inputs
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await axios.post('/api/contact', formData);
            setStatus('success');
            setFeedback('Message sent successfully! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setFeedback(error.response?.data?.message || 'Failed to send message. Please try again.');
        }
    };

    return (
        <div className="container-standard py-12 min-h-screen">

            <div className="max-w-lg mx-auto bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-950/5">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Send a Message</h3>

                {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                        <CheckCircle size={20} />
                        {feedback}
                    </div>
                )}

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={20} />
                        {feedback}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-[#F3F5FF] border-none rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-[#F3F5FF] border-none rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full bg-[#F3F5FF] border-none rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400"
                            placeholder="How can we help?"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full bg-[#F3F5FF] border-none rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium min-h-[150px] resize-none placeholder:text-gray-400"
                            placeholder="Your message details..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-primary text-white py-3 px-6 rounded-full font-bold hover:translate-y-[-2px] transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                    >
                        {status === 'submitting' ? (
                            <span>Sending...</span>
                        ) : (
                            <>
                                <Send size={20} />
                                Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Contact;
