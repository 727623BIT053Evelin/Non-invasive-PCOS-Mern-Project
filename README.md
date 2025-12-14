# PCOS Care - Full-Stack MERN Application

A comprehensive PCOS management platform with AI-powered prediction, community features, and expert resources.

## 🌟 Features

- **ML-Powered Prediction**: Gradient Boosting model with SHAP explanations
- **PDF Reports**: Downloadable medical reports with visualizations
- **User Authentication**: Secure JWT-based auth system
- **AI Chatbot**: PCOS-specific assistant on all pages
- **Community Platform**: Groups, posts, and events
- **Expert Directory**: Find gynecologists, nutritionists, therapists
- **Resources Hub**: Lifestyle tips and PCOS information

## 🏗️ Architecture

```
┌─────────────┐
│   React     │ Port 3000
│  Frontend   │
└──────┬──────┘
       │ API
       │
┌──────▼──────┐
│   Express   │ Port 5000
│   Backend   │
└──────┬──────┘
       │
    ┌──┴──┐
    │     │
    ▼     ▼
┌────────┐ ┌────────┐
│MongoDB │ │ Flask  │ Port 5001
│   DB   │ │ML Svc  │
└────────┘ └────────┘
```

## 📋 Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Install Python ML dependencies
cd ml_service
pip install -r requirements.txt

# Install Express dependencies
cd ../server
npm install

# Install React dependencies
cd ../client
npm install
```

### 2. Environment Setup

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/pcos_care
JWT_SECRET=your_secret_key_here
PORT=5000
ML_SERVICE_URL=http://localhost:5001
```

### 3. Train ML Model

```bash
# Run from project root
python save_model.py
```

### 4. Start Services

**Terminal 1 - ML Service:**
```bash
cd ml_service
python app.py
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd client
npm run dev
```

### 5. Access Application

Open `http://localhost:3000` in your browser

## 📦 Project Structure

```
Non_invasive_Pcos_MERNproject/
├── save_model.py          # ML model training script
├── ml_model/              # Saved model files (.joblib)
├── ml_service/            # Flask ML microservice
│   ├── app.py
│   └── requirements.txt
├── server/                # Express backend
│   ├── server.js
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── middleware/        # Auth middleware
└── client/                # React frontend
    ├── src/
    │   ├── App.jsx
    │   ├── components/    # Reusable components
    │   └── pages/         # Page components
    └── package.json
```

## 🔐 Default Admin Account

Create an admin user via MongoDB:
```js
db.users.updateOne(
  { email: "admin@pcoscare.org" },
  { $set: { isAdmin: true } }
)
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Predictions
- `POST /api/predictions` - Make prediction
- `GET /api/predictions/history` - Get history
- `POST /api/predictions/:id/report` - Generate PDF

### Community
- `GET /api/posts` - Get posts
- `POST /api/posts` - Create post (auth required)
- `POST /api/posts/:id/like` - Like post

### Admin
- `POST /api/experts` - Add expert (admin only)
- `POST /api/events` - Add event (admin only)
- `POST /api/testimonials` - Add testimonial (admin only)

## 🧪 Testing

1. Register a new account
2. Login and navigate to Prediction page
3. Fill form with sample data
4. Submit for prediction
5. View SHAP visualization
6. Download PDF report
7. Check Dashboard for history

## 🎨 Design System

- **Primary Color**: #8B5CF6 (Purple)
- **Secondary Color**: #EC4899 (Pink)
- **Font**: Inter (Google Fonts)
- **Style**: Clean, flat, card-based

## 📝 License

MIT License - feel free to use for learning or projects!

## 🤝 Contributing

This is a student/learning project. Contributions welcome!

## 📧 Support

For questions: support@pcoscare.org

---

**Built with:** React · Express · MongoDB · Flask · Scikit-learn · SHAP
