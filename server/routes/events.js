const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { status = 'upcoming' } = req.query;

        const query = status !== 'all' ? { status } : {};

        const events = await Event.find(query).sort({ date: 1 });

        res.json(events);
    } catch (error) {
        console.error('Events fetch error:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    try {
        const { title, description, date, eventType, imageUrl } = req.body;

        if (!title || !description || !date || !eventType) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const event = new Event({
            title,
            description,
            date,
            eventType,
            imageUrl
        });

        await event.save();

        res.status(201).json(event);
    } catch (error) {
        console.error('Event creation error:', error);
        res.status(500).json({ message: 'Error creating event' });
    }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { title, description, date, eventType, imageUrl, status } = req.body;

        if (title) event.title = title;
        if (description) event.description = description;
        if (date) event.date = date;
        if (eventType) event.eventType = eventType;
        if (imageUrl !== undefined) event.imageUrl = imageUrl;
        if (status) event.status = status;

        await event.save();

        res.json(event);
    } catch (error) {
        console.error('Event update error:', error);
        res.status(500).json({ message: 'Error updating event' });
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.deleteOne();

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Event deletion error:', error);
        res.status(500).json({ message: 'Error deleting event' });
    }
});

module.exports = router;
