const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/testimonials
// @desc    Get all active testimonials
// @access  Public
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });

        res.json(testimonials);
    } catch (error) {
        console.error('Testimonials fetch error:', error);
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    try {
        const { name, location, quote, imageUrl } = req.body;

        if (!name || !location || !quote) {
            return res.status(400).json({ message: 'Please provide name, location, and quote' });
        }

        const testimonial = new Testimonial({
            name,
            location,
            quote,
            imageUrl
        });

        await testimonial.save();

        res.status(201).json(testimonial);
    } catch (error) {
        console.error('Testimonial creation error:', error);
        res.status(500).json({ message: 'Error creating testimonial' });
    }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        const { name, location, quote, imageUrl, isActive } = req.body;

        if (name) testimonial.name = name;
        if (location) testimonial.location = location;
        if (quote) testimonial.quote = quote;
        if (imageUrl !== undefined) testimonial.imageUrl = imageUrl;
        if (isActive !== undefined) testimonial.isActive = isActive;

        await testimonial.save();

        res.json(testimonial);
    } catch (error) {
        console.error('Testimonial update error:', error);
        res.status(500).json({ message: 'Error updating testimonial' });
    }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        await testimonial.deleteOne();

        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Testimonial deletion error:', error);
        res.status(500).json({ message: 'Error deleting testimonial' });
    }
});

module.exports = router;
