import { useState } from 'react';
import axios from 'axios';
import { Activity, AlertCircle, CheckCircle2, FileDown, Info, BarChart3 } from 'lucide-react';

function Prediction() {
    const [formData, setFormData] = useState({
        ' Age (yrs)': '',
        'Weight (Kg)': '',
        'Height(Cm) ': '',
        'BMI': '',
        'Pulse rate(bpm) ': '',
        'RR (breaths/min)': '',
        'Hb(g/dl)': '',
        'Cycle(R/I)': 1,
        'Cycle length(days)': '',
        'Marraige Status (Yrs)': '',
        'Pregnant(Y/N)': 0,
        'No. of abortions': 0,
        'Weight gain(Y/N)': 0,
        'hair growth(Y/N)': 0,
        'Skin darkening (Y/N)': 0,
        'Hair loss(Y/N)': 0,
        'Pimples(Y/N)': 0,
        'Fast food (Y/N)': 0,
        'Reg.Exercise(Y/N)': 0
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'select-one' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/predictions', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Prediction failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadReport = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `/api/predictions/${result.id}/report`,
                {},
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                    responseType: 'blob'
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pcos_report_${Date.now()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Failed to generate report');
        }
    };

    const inputClass = "w-full bg-[#F3F5FF] border-none rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium placeholder:text-gray-400 text-sm";
    const labelClass = "block text-sm font-bold text-gray-800 mb-2 ml-1";
    const helpTextClass = "text-[11px] text-gray-400 mt-1 ml-1 font-medium";

    return (
        <div className="container-standard py-12 min-h-screen">
            {error && (
                <div className="max-w-5xl mx-auto flex items-center gap-4 p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 mb-8 font-bold animate-in fade-in slide-in-from-top-4">
                    <AlertCircle size={24} />
                    {error}
                </div>
            )}

            <div className="max-w-6xl mx-auto bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-purple-950/5">
                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
                        {/* 1. Age */}
                        <div className="space-y-1">
                            <label className={labelClass}>Age (yrs)</label>
                            <input type="number" name=" Age (yrs)" className={inputClass} value={formData[' Age (yrs)']} onChange={handleChange} placeholder="e.g. 25" required />
                            <p className={helpTextClass}>10–60 years</p>
                        </div>

                        {/* 2. Weight */}
                        <div className="space-y-1">
                            <label className={labelClass}>Weight (Kg)</label>
                            <input type="number" name="Weight (Kg)" className={inputClass} value={formData['Weight (Kg)']} onChange={handleChange} placeholder="e.g. 55" required />
                            <p className={helpTextClass}>30–150 Kg</p>
                        </div>

                        {/* 3. Height */}
                        <div className="space-y-1">
                            <label className={labelClass}>Height(Cm)</label>
                            <input type="number" name="Height(Cm) " className={inputClass} value={formData['Height(Cm) ']} onChange={handleChange} placeholder="e.g. 162" required />
                            <p className={helpTextClass}>100–200 cm</p>
                        </div>

                        {/* 4. BMI */}
                        <div className="space-y-1">
                            <label className={labelClass}>BMI</label>
                            <input type="number" step="0.1" name="BMI" className={inputClass} value={formData['BMI']} onChange={handleChange} placeholder="e.g. 22.3" required />
                            <p className={helpTextClass}>Healthy range: 18.5–24.9</p>
                        </div>

                        {/* 5. Pulse rate */}
                        <div className="space-y-1">
                            <label className={labelClass}>Pulse rate(bpm)</label>
                            <input type="number" name="Pulse rate(bpm) " className={inputClass} value={formData['Pulse rate(bpm) ']} onChange={handleChange} placeholder="e.g. 78" required />
                            <p className={helpTextClass}>Normal: 60–100 bpm</p>
                        </div>

                        {/* 6. RR */}
                        <div className="space-y-1">
                            <label className={labelClass}>RR (breaths/min)</label>
                            <input type="number" name="RR (breaths/min)" className={inputClass} value={formData['RR (breaths/min)']} onChange={handleChange} placeholder="e.g. 16" required />
                            <p className={helpTextClass}>Normal: 12–20 breaths/min</p>
                        </div>

                        {/* 7. Hb */}
                        <div className="space-y-1">
                            <label className={labelClass}>Hb(g/dl)</label>
                            <input type="number" step="0.1" name="Hb(g/dl)" className={inputClass} value={formData['Hb(g/dl)']} onChange={handleChange} placeholder="e.g. 13.5" required />
                            <p className={helpTextClass}>Normal (female): 12–15 g/dl</p>
                        </div>

                        {/* 8. Menstruation Length */}
                        <div className="space-y-1">
                            <label className={labelClass}>Menstruation Length(days)</label>
                            <input type="number" name="Cycle length(days)" className={inputClass} value={formData['Cycle length(days)']} onChange={handleChange} placeholder="e.g. 5" required />
                            <p className={helpTextClass}>Normal range: 3–7 days</p>
                        </div>

                        {/* 9. Marraige Status */}
                        <div className="space-y-1">
                            <label className={labelClass}>Marraige Status (Yrs)</label>
                            <input type="number" name="Marraige Status (Yrs)" className={inputClass} value={formData['Marraige Status (Yrs)']} onChange={handleChange} placeholder="e.g. 3" required />
                            <p className={helpTextClass}>0–20 years</p>
                        </div>

                        {/* 10. Pregnant */}
                        <div className="space-y-1">
                            <label className={labelClass}>Pregnant(Y/N)</label>
                            <select name="Pregnant(Y/N)" className={inputClass} value={formData['Pregnant(Y/N)']} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        {/* 11. Weight gain */}
                        <div className="space-y-1">
                            <label className={labelClass}>Weight gain(Y/N)</label>
                            <select name="Weight gain(Y/N)" className={inputClass} value={formData['Weight gain(Y/N)']} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        {/* 12. hair growth */}
                        <div className="space-y-1">
                            <label className={labelClass}>hair growth(Y/N)</label>
                            <select name="hair growth(Y/N)" className={inputClass} value={formData['hair growth(Y/N)']} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        {/* 13. Skin darkening */}
                        <div className="space-y-1">
                            <label className={labelClass}>Skin darkening (Y/N)</label>
                            <select name="Skin darkening (Y/N)" className={inputClass} value={formData['Skin darkening (Y/N)']} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        {/* 14. Pimples */}
                        <div className="space-y-1">
                            <label className={labelClass}>Pimples(Y/N)</label>
                            <select name="Pimples(Y/N)" className={inputClass} value={formData['Pimples(Y/N)']} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        {/* 15. Fast food */}
                        <div className="space-y-1">
                            <label className={labelClass}>Fast food (Y/N)</label>
                            <select name="Fast food (Y/N)" className={inputClass} value={formData['Fast food (Y/N)']} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            className={`px-12 py-4 rounded-full font-bold text-lg transition-all shadow-lg active:scale-95 ${loading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-dark shadow-purple-500/20'
                                }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <Activity size={20} className="animate-spin" />
                                    <span>Predicting...</span>
                                </div>
                            ) : (
                                'Predict PCOS'
                            )}
                        </button>
                    </div>
                </form>

                {/* Results Section */}
                {result && (
                    <div className="p-8 md:p-12 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <h2 className="text-3xl font-black text-gray-900 text-center mb-12 tracking-tight">Analysis <span className="text-primary">Summary</span></h2>

                        <div className={`p-6 rounded-[2rem] text-center mb-12 border-2 transition-all ${result.prediction === 1
                            ? 'bg-red-50/50 border-red-100'
                            : 'bg-green-50/50 border-green-100'
                            }`}>
                            <div className="flex flex-col items-center gap-4">
                                <div className={`p-4 rounded-full ${result.prediction === 1 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {result.prediction === 1 ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-black mb-2 ${result.prediction === 1 ? 'text-red-600' : 'text-green-600'}`}>
                                        {result.prediction === 1 ? 'POTENTIAL RISK DETECTED' : 'LOW RISK DETECTED'}
                                    </h3>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${result.prediction === 1 ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${result.probabilities.pcos * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-gray-900 font-black text-lg">{(result.probabilities.pcos * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                            <div>
                                <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-3">
                                    <BarChart3 size={20} className="text-primary" />
                                    Risk Drivers
                                </h3>
                                <div className="space-y-3">
                                    {result.topFeatures.slice(0, 7).map(([feature, impact], i) => (
                                        <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-[1.5rem] hover:border-primary/20 transition-colors shadow-sm">
                                            <span className="font-bold text-gray-700 text-sm">{feature}</span>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-1 bg-gray-50 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: `${Math.min(Math.abs(impact) * 100, 100)}%` }}></div>
                                                </div>
                                                <span className="text-[10px] font-black text-primary bg-purple-50 px-2.5 py-1 rounded-full">{Math.abs(impact).toFixed(4)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 self-start">
                                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <FileDown size={20} className="text-primary" />
                                    Actions Required
                                </h3>
                                <div className="space-y-6">
                                    <button
                                        onClick={downloadReport}
                                        className="w-full flex items-center justify-between p-5 bg-white border-2 border-primary/20 rounded-2xl hover:bg-primary hover:text-white transition-all group shadow-sm shadow-purple-950/5"
                                    >
                                        <div className="text-left font-bold">
                                            <p className="text-sm">Download Clinical Report</p>
                                            <p className="text-xs opacity-60 font-medium">Export results for your physician</p>
                                        </div>
                                        <FileDown size={24} className="text-primary group-hover:text-white transition-colors" />
                                    </button>

                                    <div className="flex gap-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                                        <Info size={24} className="text-red-500 shrink-0" />
                                        <p className="text-xs text-red-700 leading-relaxed font-medium">
                                            <strong>Medical Disclaimer:</strong> This automated analysis is designed for early screening. It is essential to share this result with a healthcare professional for a comprehensive evaluation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prediction;
