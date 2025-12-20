module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#9333ea",
                "primary-dark": "#7e22ce",
                "bg-light": "#ffffff",
                "bg-card": "#ffffff",
                "border": "#f0f0f0",
                "danger": "#EF4444",
                "warning": "#F59E0B",
                "success": "#10B981",
            },
            boxShadow: {
                'app-box': '0 0 50px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
};
