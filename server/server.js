const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const path = require('path');
console.log('--- SERVER STARTING ---');
console.log('Path:', __dirname);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✓ MongoDB connected successfully'))
    .catch((err) => console.error('✗ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/predictions', require('./routes/prediction'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/experts', require('./routes/experts'));
app.use('/api/events', require('./routes/events'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/chat', require('./routes/chat'));
app.get('/api/test-direct', (req, res) => res.json({ message: 'Server is reachable and code is updated' }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', message: 'PCOS Care API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log('PCOS Care Backend Server');
    console.log(`${'='.repeat(60)}`);
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ API endpoints: http://localhost:${PORT}/api`);
    console.log('✓ Chatbot route active');
    console.log(`${'='.repeat(60)}\n`);
});
