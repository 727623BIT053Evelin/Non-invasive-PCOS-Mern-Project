import { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronRight, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hi! I'm your PCOS AI Assistant. Ask me anything about PCOS or how this platform can help you!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [latestPrediction, setLatestPrediction] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchLatestPrediction = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get('/api/predictions/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data && response.data.length > 0) {
                    setLatestPrediction(response.data[0]); // Get the most recent one
                    console.log('Latest prediction fetched for chatbot context');
                }
            } catch (error) {
                console.error('Failed to fetch prediction for chatbot:', error);
            }
        };

        if (isOpen) {
            fetchLatestPrediction();
        }
    }, [isOpen]);

    const quickQuestions = [
        "Analyze my predicted result",
        "How does the PCOS screening work?",
        "What is the best diet for PCOS?",
        "How can I book an expert appointment?"
    ];

    const handleSend = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMessage = { type: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Send to backend Gemini API with user context
            const response = await axios.post('/api/chat', {
                message: text,
                history: messages.slice(1), // Send history excluding the welcome message
                userContext: latestPrediction
            });

            setMessages(prev => [...prev, { type: 'bot', text: response.data.text }]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errMsg = error.response?.data?.error || error.response?.data?.message || error.message;
            setMessages(prev => [...prev, {
                type: 'bot',
                text: `I'm having trouble: ${errMsg}. Please check if the server is running and the API key is valid.`
            }]);
        } finally {
            setIsLoading(false);
        }
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
                <div className="bg-white w-[400px] h-[640px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-8 duration-300">
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
                        {/* Messages */}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none ProseMirror bot-markdown-content'
                                        }`}
                                >
                                    {msg.type === 'user' ? (
                                        <p>{msg.text}</p>
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-extrabold text-gray-900" {...props} />,
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                    <Loader2 size={18} className="animate-spin text-primary" />
                                    <span className="text-sm text-gray-400 font-medium">Assistant is thinking...</span>
                                </div>
                            </div>
                        )}

                        {/* Quick Questions (only show at start) */}
                        {messages.length === 1 && !isLoading && (
                            <div className="space-y-3 pt-2">
                                <div className="text-[12px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                                    Common Questions
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
                        <div ref={messagesEndRef} />
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
                            disabled={isLoading}
                        />
                        <button
                            onClick={() => handleSend(input)}
                            disabled={isLoading || !input.trim()}
                            className={`bg-primary text-white p-3 rounded-2xl shadow-lg transition-all active:scale-95 ${(isLoading || !input.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                                }`}
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
