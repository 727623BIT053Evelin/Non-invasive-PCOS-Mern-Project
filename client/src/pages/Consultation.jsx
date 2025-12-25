import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, User, Calendar, Clock, CheckCircle, Info, Star, X } from 'lucide-react';

function Consultation({ user }) {
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('Gynecologist');
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    // Booking State
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [bookingNotes, setBookingNotes] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const specialties = ['Gynecologist', 'Endocrinologist', 'Nutritionist', 'Therapist'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setSearching(true);
        try {
            const response = await axios.get(`/api/experts?specialty=${specialty}&location=${location}`);
            setExperts(response.data);
        } catch (error) {
            console.error('Error searching experts:', error);
        } finally {
            setSearching(false);
        }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to book an appointment');

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/appointments', {
                expertId: selectedExpert._id,
                date: bookingDate,
                timeSlot: bookingTime,
                notes: bookingNotes
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookingSuccess(true);
            setTimeout(() => {
                setSelectedExpert(null);
                setBookingSuccess(false);
                setBookingDate('');
                setBookingTime('');
                setBookingNotes('');
            }, 3000);
        } catch (error) {
            alert('Failed to book appointment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-standard py-12 min-h-screen">
            <div className="max-w-lg mx-auto bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-xl shadow-purple-950/5">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Find a Specialist</h3>
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-gray-400 font-medium"
                            placeholder="City or Zip Code"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Specialty</label>
                        <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium appearance-none cursor-pointer"
                        >
                            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={searching}
                        className="w-full bg-primary text-white py-3 px-6 rounded-full font-bold hover:bg-primary-dark transition-all shadow-lg shadow-purple-500/20 active:scale-95 mt-4"
                    >
                        {searching ? 'Searching...' : 'Search Experts'}
                    </button>
                </form>
            </div>

            {/* Experts List Area */}
            <div className="max-w-4xl mx-auto mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {experts.map((expert) => (
                        <div key={expert._id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-primary">
                                    <User size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{expert.name}</h4>
                                    <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-wider">
                                        <Star size={10} className="fill-primary" />
                                        <span>{expert.specialty}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold mt-1">
                                        <MapPin size={12} />
                                        <span>{expert.location}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                                {expert.bio || "Specialist in PCOS management and hormone health. Certified practitioner."}
                            </p>
                            <button
                                onClick={() => setSelectedExpert(expert)}
                                className="w-full bg-gray-50 text-gray-900 py-2.5 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all"
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>

                {experts.length === 0 && !searching && (
                    <div className="text-center py-12 opacity-40">
                        <p className="text-gray-500 font-bold">
                            {location ? 'No specialists found in this location.' : 'Select a specialty and location to find experts.'}
                        </p>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {selectedExpert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        {bookingSuccess ? (
                            <div className="p-12 text-center animate-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h2>
                                <p className="text-gray-500 font-medium">Your appointment request with {selectedExpert.name} has been sent successfully.</p>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setSelectedExpert(null)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"
                                >
                                    <X size={24} />
                                </button>
                                <div className="p-8 md:p-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-primary">
                                            <User size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900">Schedule Vist</h3>
                                            <p className="text-sm font-bold text-gray-400">with {selectedExpert.name}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleBook} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={bookingDate}
                                                    onChange={(e) => setBookingDate(e.target.value)}
                                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-50 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Time Slot</label>
                                                <select
                                                    required
                                                    value={bookingTime}
                                                    onChange={(e) => setBookingTime(e.target.value)}
                                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-50 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select Time</option>
                                                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Additional Notes</label>
                                            <textarea
                                                value={bookingNotes}
                                                onChange={(e) => setBookingNotes(e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-purple-50 transition-all h-24 resize-none"
                                                placeholder="Briefly describe your concern..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-purple-500/20 hover:translate-y-[-2px] transition-all disabled:opacity-50"
                                        >
                                            {submitting ? 'Confirming...' : 'Request Appointment'}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-purple-100/30 p-8 rounded-[2.5rem] text-center mt-20 border border-purple-100 max-w-3xl mx-auto flex items-start gap-4 text-left">
                <Info size={24} className="text-primary shrink-0 mt-1" />
                <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    <strong className="text-primary font-black uppercase text-[10px] tracking-wider block mb-1">Medical Disclaimer</strong>
                    This directory is for informational purposes. Booking a session through PCOS Care is a request for a consultation. Always share your screening results with your primary healthcare provider for a clinical diagnosis.
                </p>
            </div>
        </div>
    );
}

export default Consultation;

