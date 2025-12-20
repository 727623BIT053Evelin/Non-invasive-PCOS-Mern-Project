import { Apple, Activity, Heart, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

function Resources() {
    return (
        <div className="container-standard py-12 min-h-screen bg-white">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 font-outfit">
                <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-purple-950/5 hover:-translate-y-2 transition-all">
                    <div className="w-14 h-14 bg-purple-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                        <Apple size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Healthy Diet</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                        Eat whole grains, high-fiber veggies, lean proteins, and healthy fats. Go easy on sugar, white bread, and fried food.
                    </p>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-purple-950/5 hover:-translate-y-2 transition-all">
                    <div className="w-14 h-14 bg-purple-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                        <Activity size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Regular Exercise</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                        Aim for 150+ minutes of moderate activity per week. Try fast walking, swimming, cycling, or dance—consistency is key!
                    </p>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-purple-950/5 hover:-translate-y-2 transition-all">
                    <div className="w-14 h-14 bg-purple-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                        <Heart size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Wellness</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                        Yoga, meditation, or just a mindful walk outdoors can lower stress hormones and improve overall symptom control.
                    </p>
                </div>
            </div>

            <div className="bg-[#FAF5FF] p-8 md:p-12 rounded-[3rem] border-2 border-primary/10 mb-16 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                    <div className="lg:w-1/3">
                        <div className="bg-primary/10 w-fit p-4 rounded-3xl mb-6">
                            <ShieldAlert size={40} className="text-primary" />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Why act now?</h3>
                        <p className="text-gray-600 font-medium">Early management prevents long-term health complications.</p>
                    </div>
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-6 bg-white border border-purple-50 rounded-2xl shadow-sm">
                            <div className="w-2 h-full bg-red-400 rounded-full shrink-0"></div>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed">Lowers risk for diabetes and high blood pressure.</p>
                        </div>
                        <div className="flex gap-4 p-6 bg-white border border-purple-50 rounded-2xl shadow-sm">
                            <div className="w-2 h-full bg-purple-400 rounded-full shrink-0"></div>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed">Reduces risk of irregular periods and infertility.</p>
                        </div>
                        <div className="flex gap-4 p-6 bg-white border border-purple-50 rounded-2xl shadow-sm">
                            <div className="w-2 h-full bg-blue-400 rounded-full shrink-0"></div>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed">Improves mental health, reducing anxiety risks.</p>
                        </div>
                        <div className="flex gap-4 p-6 bg-white border border-purple-50 rounded-2xl shadow-sm">
                            <div className="w-2 h-full bg-green-400 rounded-full shrink-0"></div>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed">Prevents acne and severe hormonal excess hair growth.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-purple-950/5">
                <div className="flex items-center gap-4 mb-8">
                    <Sparkles className="text-primary" />
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Advanced Self-Care Tips</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium text-gray-600">
                    <li className="flex gap-4">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                        <span>Track symptoms in a journal to reveal cycle patterns.</span>
                    </li>
                    <li className="flex gap-4">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                        <span>Prioritize 7-9 hours of restful sleep for hormonal harmony.</span>
                    </li>
                    <li className="flex gap-4">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                        <span>Limit processed foods and high-fructose corn syrup.</span>
                    </li>
                    <li className="flex gap-4">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                        <span>Consult a doctor about Myo-inositol or Vitamin D.</span>
                    </li>
                    <li className="flex gap-4 lg:col-span-2">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                        <span>Build a support system of peers for shared motivation and mental wellness.</span>
                    </li>
                </ul>
            </div>


            <div className="bg-purple-50/80 p-8 rounded-3xl text-center mt-20 border border-purple-100 max-w-3xl mx-auto">
                <p className="text-sm text-gray-800 leading-relaxed">
                    <strong className="text-primary font-bold"> "Every healthy step—no matter how small—moves you closer to hormonal freedom."</strong>
                </p>
            </div>


        </div>
    );
}

export default Resources;
