function Consultation() {
    return (
        <div className="container-standard py-12 min-h-screen bg-white">


            <div className="max-w-2xl mx-auto bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-purple-950/5">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Find a Specialist</h3>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Location</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-gray-400 font-medium"
                            placeholder="City or Zip Code"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Specialty</label>
                        <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium appearance-none cursor-pointer">
                            <option>Gynecologist</option>
                            <option>Endocrinologist</option>
                            <option>Nutritionist</option>
                            <option>Therapist</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 px-8 rounded-full font-bold hover:bg-primary-dark transition-all shadow-lg shadow-purple-500/20 active:scale-95 mt-4"
                    >
                        Search Experts
                    </button>
                </form>
            </div>

            <div className="bg-purple-50/80 p-8 rounded-3xl text-center mt-20 border border-purple-100 max-w-3xl mx-auto">
                <p className="text-sm text-gray-800 leading-relaxed">
                    <strong className="text-primary font-bold">Note:</strong> This is for informational purposes only. Always consult your healthcare provider before starting any new treatment.
                </p>
            </div>
        </div>
    );
}

export default Consultation;
