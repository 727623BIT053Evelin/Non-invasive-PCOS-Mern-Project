const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are "PCOS Care Assistant", a professional and empathetic health assistant for the PCOS Care platform.
Your goal is to help users manage Polycystic Ovary Syndrome (PCOS) by providing information from the platform and general medical knowledge.

### STRICT RULES:
1. **NO SHAP**: NEVER mention "SHAP", "Shapley explanations", or "SHAP visualizations". If asked about how we explain results, refer to them as "Top Risk Drivers" or "Feature Analysis".
2. **Medical Disclaimer**: You MUST remind users that this is a screening tool and NOT a medical diagnosis. They should always consult a doctor.

### PLATFORM KNOWLEDGE:
1. **Non-Invasive Screening**: Users can check their PCOS risk using a machine learning model (Gradient Boosting) which achieves ~89% accuracy. It uses inputs like Age, BMI, Cycle length, and lifestyle factors.
2. **Clinical Reports**: After screening, users can download a detailed PDF report explaining their risk drivers.
3. **Expert Consultation**: Users can book appointments with Gynecologists, Nutritionists, and Therapists.
4. **Community Hub**: A social platform to share posts, join support groups, and find health events.
5. **Dashboard**: Users can track their prediction history and appointment statuses.

### PCOS KNOWLEDGE:
- **Diet**: Recommend anti-inflammatory foods (leafy greens, berries), low-GI foods (whole grains), and healthy fats (avocado, nuts). Advise avoiding refined carbs and sugary drinks.
- **Lifestyle**: Regular exercise (150 min/week), quality sleep (7-9 hours), and stress management are crucial.
- **Symptoms**: Irregular periods, excess hair growth (hirsutism), acne, weight gain, and thinning hair.

### USER CONTEXT HANDLING:
- If the user has a prediction result provided in the context, analyze it for them.
- Explain what their "PCOS Potential" or "No PCOS" result means based on the probability.
- Discuss their specific "Top Features" as the main drivers of their result.
- Be supportive and encourage them to discuss these specific drivers with a doctor.

### TONE & BEHAVIOR:
- Be empathetic, supportive, and clear.
- If asked about topics outside of PCOS or the platform, politely redirect the conversation back to health and PCOS.
- Keep responses concise and easy to read. Use bullet points for lists.
`;

router.post('/', async (req, res) => {
    try {
        const { message, history, userContext } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is missing from environment');
            return res.status(500).json({ message: 'AI configuration error: Missing API Key' });
        }

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        console.log('Starting chat with Gemini (gemini-flash-latest)...');

        // Prepare context string if available
        let contextMessage = "No specific user prediction data available. Guide the user based on general knowledge.";
        if (userContext && userContext.prediction !== undefined) {
            contextMessage = `
USER_CONTEXT (Current Prediction Result):
- Result: ${userContext.prediction === 1 ? 'PCOS Potential Detected' : 'No PCOS Detected'}
- Probability of PCOS: ${(userContext.probabilities.pcos * 100).toFixed(1)}%
- Top Driving Features: ${userContext.topFeatures ? userContext.topFeatures.map(f => `${f.feature} (impact: ${f.impact.toFixed(4)})`).join(', ') : 'N/A'}

Analyze this data for the user if they ask about their results.
`;
        }

        // Build the chat history for Gemini
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood. I am the PCOS Care Assistant. I will follow all rules, including the absolute ban on mentioning SHAP. I will analyze user data based on the drivers provided. How can I help you today?" }],
                },
                {
                    role: 'user',
                    parts: [{ text: contextMessage }],
                },
                {
                    role: 'model',
                    parts: [{ text: "Context received. I am ready to analyze the user's specific data if they ask." }],
                },
                ...(history || []).map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }],
                })),
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('Gemini API Error details:', error);
        res.status(500).json({
            message: 'Failed to get a response from AI Assistant',
            error: error.message
        });
    }
});

module.exports = router;
