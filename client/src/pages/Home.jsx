import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen">
            {/* 1. VISUAL HERO SECTION */}
            <section className="container-standard pt-6 md:pt-10 pb-12 md:pb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 md:pl-12">
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">Non-Invasive AI-Powered Screening</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight my-4">
                            Your <span className="text-primary">Health</span> <br />
                            Is Our Priority
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-[600px]">
                            Early risk assessment for Polycystic Ovary Syndrome using machine learning — no blood tests, no scans. Know your risk and take control early.
                        </p>

                        {/* SEARCH-STYLE SCREENING BAR */}
                        <div className="flex items-center bg-white border border-gray-100 rounded-full p-2 shadow-lg gap-2 max-w-lg">
                            <div className="flex items-center flex-1 pl-4">
                                <span className="text-gray-400 mr-2">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Check your PCOS risk now..."
                                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                                    readOnly
                                />
                            </div>
                            <Link
                                to="/prediction"
                                className="bg-primary text-white py-3 px-8 rounded-full font-bold hover:bg-primary-dark transition-all shadow-md active:scale-95"
                            >
                                Start Screening
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                            <img
                                src="/assets/hero-doctor.png"
                                alt="Professional Health Specialist Illustration"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. WHY NON-INVASIVE MATTERS */}
            <section className="bg-gray-50 py-20">
                <div className="container-standard">
                    <div className="text-center mb-12">
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">The Importance</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Why Non-Invasive Screening Matters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
                            <h4 className="text-xl font-bold mb-6 text-gray-400">Traditional Diagnosis</h4>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-gray-600">
                                    <span className="mr-3 text-gray-300">•</span>
                                    Hormonal blood tests
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <span className="mr-3 text-gray-300">•</span>
                                    Ultrasound imaging
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <span className="mr-3 text-gray-300">•</span>
                                    Repeated clinical visits
                                </li>
                            </ul>
                            <p className="text-sm text-gray-400 font-medium">Can be costly, invasive, and inaccessible in low-resource settings.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/20 transition-transform hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary/10 text-primary text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>
                            <h4 className="text-xl font-bold mb-6 text-primary">Our Approach</h4>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-3 text-primary">✓</span>
                                    No invasive medical tests
                                </li>
                                <li className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-3 text-primary">✓</span>
                                    Instant risk identification
                                </li>
                                <li className="flex items-center text-gray-700 font-medium">
                                    <span className="mr-3 text-primary">✓</span>
                                    Accessible at home
                                </li>
                            </ul>
                            <p className="text-sm text-primary/70 font-medium">Enabling users to take proactive steps toward better health management.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. AI METHODOLOGY */}
            <section className="container-standard py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wide uppercase text-sm">Our Technology</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">Our Machine Learning Approach</h2>
                    <p className="text-gray-600 text-lg">
                        The screening system is built using a Gradient Boosting Classifier, optimized with Mutual Information–based feature selection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#f5f3ff] p-8 rounded-3xl border border-primary/5 text-center">
                        <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-2xl mx-auto mb-6 text-xl shadow-lg">✓</div>
                        <h5 className="text-xl font-bold mb-3">Non-Invasive Features</h5>
                        <p className="text-gray-600">Uses only clinically collected lifestyle indicators.</p>
                    </div>
                    <div className="bg-[#f5f3ff] p-8 rounded-3xl border border-primary/5 text-center">
                        <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-2xl mx-auto mb-6 text-xl shadow-lg">✓</div>
                        <h5 className="text-xl font-bold mb-3">Optimized with SMOTE</h5>
                        <p className="text-gray-600">Handles data imbalance for reliable predictions.</p>
                    </div>
                    <div className="bg-[#f5f3ff] p-8 rounded-3xl border border-primary/5 text-center">
                        <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-2xl mx-auto mb-6 text-xl shadow-lg">✓</div>
                        <h5 className="text-xl font-bold mb-3">High Performance</h5>
                        <p className="text-gray-600">Achieved ~89% accuracy across key metrics.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
