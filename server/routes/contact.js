const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({
            message: 'Message sent successfully!',
            contact: newContact
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', adminAuth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// @route   PATCH /api/contact/:id
// @desc    Update message status
// @access  Private/Admin
router.patch('/:id', adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(contact);
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ message: 'Error updating message status' });
    }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a message
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Error deleting message' });
    }
});

module.exports = router;
