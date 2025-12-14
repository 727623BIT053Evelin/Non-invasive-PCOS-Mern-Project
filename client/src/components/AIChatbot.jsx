import { useState } from 'react';

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

        // Default response
        return "I'm here to help with PCOS-related questions! Try asking about diet, symptoms, exercise, or natural management. For medical advice, please consult your healthcare provider.";
    };

    const handleSend = (text) => {
        if (!text.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text }]);

        // Get bot response
        setTimeout(() => {
            const answer = findAnswer(text);
            setMessages(prev => [...prev, { type: 'bot', text: answer }]);
        }, 500);

        setInput('');
    };

    const handleQuickQuestion = (question) => {
        handleSend(question);
    };

    return (
        <>
            <button
                className="chatbot-button"
                onClick={() => setIsOpen(!isOpen)}
                title="PCOS AI Assistant"
            >
                💬
            </button>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>PCOS AI Assistant</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {/* Quick Questions */}
                        {messages.length === 1 && (
                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                    Quick questions:
                                </p>
                                {quickQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickQuestion(q)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '0.5rem',
                                            marginBottom: '0.5rem',
                                            background: '#FAF5FF',
                                            border: '1px solid #8B5CF6',
                                            borderRadius: '8px',
                                            color: '#8B5CF6',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: '1rem',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    background: msg.type === 'bot' ? '#FAF5FF' : '#8B5CF6',
                                    color: msg.type === 'bot' ? '#1F2937' : 'white',
                                    maxWidth: '85%',
                                    marginLeft: msg.type === 'user' ? 'auto' : '0'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                            placeholder="Ask about PCOS..."
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSend(input)}
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIChatbot;
