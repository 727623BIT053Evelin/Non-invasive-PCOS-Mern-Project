import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
    return (
        <div className="container-standard py-12 min-h-screen bg-white">

            <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Send a Message</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Your Name</label>
                            <input
                                type="text"
                                className="w-full bg-[#F3F5FF] border-none rounded-xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Your Email</label>
                            <input
                                type="email"
                                className="w-full bg-[#F3F5FF] border-none rounded-xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Subject</label>
                        <input
                            type="text"
                            className="w-full bg-[#F3F5FF] border-none rounded-xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400"
                            placeholder="How can we help?"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Message</label>
                        <textarea
                            className="w-full bg-[#F3F5FF] border-none rounded-xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium min-h-[150px] resize-none placeholder:text-gray-400"
                            placeholder="Your message details..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-5 px-8 rounded-full font-bold hover:translate-y-[-2px] transition-all shadow-lg shadow-purple-500/20 active:scale-95 flex items-center justify-center gap-3 mt-4"
                    >
                        <Send size={20} />
                        Send Message
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Contact;
