import { useState } from 'react';
import { X, Send, ChevronRight, Bot } from 'lucide-react';

const PCOS_KNOWLEDGE = {
    "what foods should i avoid": "Avoid refined carbs (white bread, pastries), sugary drinks, processed foods, and excessive dairy. Focus on whole grains, lean proteins, vegetables, and healthy fats.",
    "best diet plan for pcos": "A low-glycemic, anti-inflammatory diet works best: whole grains, lean proteins, plenty of vegetables, healthy fats (olive oil, nuts), and limit sugar and processed foods.",
    "does pcos cause infertility": "PCOS can make it harder to conceive due to irregular ovulation, but it doesn't mean infertility. Many women with PCOS conceive naturally or with medical help like ovulation medications.",
    "how to manage pcos naturally": "Key natural approaches: maintain healthy weight (even 5-10% weight loss helps), regular exercise (150+ min/week), stress management (yoga, meditation), quality sleep (7-9 hours), and a balanced diet.",
    "pcos symptoms": "Common symptoms include irregular periods, excess hair growth (face, chest), acne, weight gain, hair thinning, and difficulty getting pregnant. Not everyone has all symptoms.",
    "exercise for pcos": "Combination works best: 150 minutes moderate cardio weekly (walking, cycling) + strength training 2-3x/week. Both help with insulin resistance and weight management.",
    "supplements for pcos": "Commonly recommended: Inositol (improves insulin sensitivity), Vitamin D, Omega-3, Magnesium. Always consult your doctor before starting supplements.",
    "pcos and diabetes": "PCOS increases diabetes risk due to insulin resistance. Early lifestyle changes (diet, exercise) can prevent or delay type 2 diabetes. Regular screening is important."
};

function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hi! I'm your PCOS AI Assistant. Ask me anything about PCOS!" }
    ]);
    const [input, setInput] = useState('');

    const quickQuestions = [
        "What foods should I avoid?",
        "Best diet plan for PCOS?",
        "Does PCOS cause infertility?",
        "How to manage PCOS naturally?"
    ];

    const findAnswer = (question) => {
        const lowerQ = question.toLowerCase();

        for (const [key, answer] of Object.entries(PCOS_KNOWLEDGE)) {
            if (lowerQ.includes(key)) {
                return answer;
            }
        }

        return "I'm here to help with PCOS-related questions! Try asking about diet, symptoms, exercise, or natural management. For medical advice, please consult your healthcare provider.";
    };

    const handleSend = (text) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { type: 'user', text }]);

        setTimeout(() => {
            const answer = findAnswer(text);
            setMessages(prev => [...prev, { type: 'bot', text: answer }]);
        }, 500);

        setInput('');
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-4 rounded-full shadow-[0_8px_30px_rgba(147,51,234,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center font-bold"
                >
                    <Bot size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-[380px] h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-8 duration-300">
                    {/* Header */}
                    <div className="bg-primary p-6 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">AI Assistant</h3>
                                <p className="text-xs text-purple-100 opacity-80 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                        {/* Welcome/Quick Questions */}
                        {messages.length === 1 && (
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-sm text-gray-500 font-medium">
                                    Suggested Questions:
                                </div>
                                <div className="grid gap-2">
                                    {quickQuestions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(q)}
                                            className="w-full text-left p-4 bg-white hover:bg-purple-50 hover:border-primary/30 border border-gray-100 rounded-2xl text-sm font-semibold text-gray-700 transition-all flex items-center justify-between group"
                                        >
                                            {q}
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                        <button
                            onClick={() => handleSend(input)}
                            className="bg-primary text-white p-3 rounded-2xl shadow-lg hover:bg-primary-dark transition-all active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AIChatbot;
