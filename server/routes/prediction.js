const express = require('express');
const router = express.Router();
const axios = require('axios');
const Prediction = require('../models/Prediction');
const { auth } = require('../middleware/auth');

// @route   POST /api/predictions
// @desc    Create new prediction
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const inputFeatures = req.body;

        // Forward to ML service
        const mlResponse = await axios.post(
            `${process.env.ML_SERVICE_URL}/predict`,
            inputFeatures
        );

        const { prediction, probabilities, feature_importance, top_features } = mlResponse.data;

        // Save prediction to database
        const predictionDoc = new Prediction({
            user: req.user._id,
            inputFeatures,
            prediction,
            probabilities,
            topFeatures: top_features.map(([feature, impact]) => ({ feature, impact }))
        });

        await predictionDoc.save();

        res.json({
            id: predictionDoc._id,
            prediction,
            probabilities,
            topFeatures: top_features
        });
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({
            message: 'Error making prediction',
            error: error.response?.data || error.message
        });
    }
});

// @route   GET /api/predictions/history
// @desc    Get user's prediction history
// @access  Private
router.get('/history', auth, async (req, res) => {
    try {
        const predictions = await Prediction.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(predictions);
    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({ message: 'Error fetching prediction history' });
    }
});

// @route   GET /api/predictions/:id
// @desc    Get specific prediction details
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const prediction = await Prediction.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!prediction) {
            return res.status(404).json({ message: 'Prediction not found' });
        }

        res.json(prediction);
    } catch (error) {
        console.error('Prediction fetch error:', error);
        res.status(500).json({ message: 'Error fetching prediction' });
    }
});

// @route   POST /api/predictions/:id/report
// @desc    Generate PDF report
// @access  Private
router.post('/:id/report', auth, async (req, res) => {
    try {
        const prediction = await Prediction.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!prediction) {
            return res.status(404).json({ message: 'Prediction not found' });
        }

        // Prepare data for report
        const reportData = {
            prediction: prediction.prediction,
            probabilities: prediction.probabilities,
            top_features: prediction.topFeatures.map(f => [f.feature, f.impact])
        };

        // Request PDF from ML service
        const mlResponse = await axios.post(
            `${process.env.ML_SERVICE_URL}/generate-report`,
            reportData,
            { responseType: 'arraybuffer' }
        );

        // Send PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=pcos_report_${prediction._id}.pdf`);
        res.send(mlResponse.data);
    } catch (error) {
        console.error('Report generation error:', error);
        res.status(500).json({ message: 'Error generating report' });
    }
});

module.exports = router;
