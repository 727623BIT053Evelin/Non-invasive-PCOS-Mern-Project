const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');
const { auth, adminAuth } = require('../middleware/auth');

// @route   GET /api/experts
// @desc    Get all experts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { specialty, location } = req.query;
        console.log(`Expert search: specialty=${specialty}, location=${location}`);

        const query = {};
        if (specialty) query.specialty = specialty;
        if (location) query.location = new RegExp(location, 'i'); // Case-insensitive search

        const experts = await Expert.find(query).sort({ rating: -1, name: 1 });

        res.json(experts);
    } catch (error) {
        console.error('Experts fetch error:', error);
        res.status(500).json({ message: 'Error fetching experts' });
    }
});

// @route   POST /api/experts
// @desc    Create new expert
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    try {
        const { name, specialty, location, contactEmail, contactPhone, bio, imageUrl, rating } = req.body;

        if (!name || !specialty || !location) {
            return res.status(400).json({ message: 'Please provide name, specialty, and location' });
        }

        const expert = new Expert({
            name,
            specialty,
            location,
            contactEmail,
            contactPhone,
            bio,
            imageUrl,
            rating
        });

        await expert.save();

        res.status(201).json(expert);
    } catch (error) {
        console.error('Expert creation error:', error);
        res.status(500).json({ message: 'Error creating expert' });
    }
});

// @route   PUT /api/experts/:id
// @desc    Update expert
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }

        const { name, specialty, location, contactEmail, contactPhone, bio, imageUrl, rating } = req.body;

        if (name) expert.name = name;
        if (specialty) expert.specialty = specialty;
        if (location) expert.location = location;
        if (contactEmail !== undefined) expert.contactEmail = contactEmail;
        if (contactPhone !== undefined) expert.contactPhone = contactPhone;
        if (bio !== undefined) expert.bio = bio;
        if (imageUrl !== undefined) expert.imageUrl = imageUrl;
        if (rating !== undefined) expert.rating = rating;

        await expert.save();

        res.json(expert);
    } catch (error) {
        console.error('Expert update error:', error);
        res.status(500).json({ message: 'Error updating expert' });
    }
});

// @route   DELETE /api/experts/:id
// @desc    Delete expert
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }

        await expert.deleteOne();

        res.json({ message: 'Expert deleted successfully' });
    } catch (error) {
        console.error('Expert deletion error:', error);
        res.status(500).json({ message: 'Error deleting expert' });
    }
});

module.exports = router;
