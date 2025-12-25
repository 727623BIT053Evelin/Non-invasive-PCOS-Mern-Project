const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST /api/appointments
// @desc    Book a new appointment
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { expertId, date, timeSlot, notes } = req.body;

        if (!expertId || !date || !timeSlot) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const appointment = new Appointment({
            expertId,
            userId: req.user._id,
            userName: req.user.name,
            userEmail: req.user.email,
            date,
            timeSlot,
            notes
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Appointment booking error:', error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
});

// @route   GET /api/appointments/my
// @desc    Get current user's appointments
// @access  Private
router.get('/my', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id })
            .populate('expertId', 'name specialty location')
            .sort({ createdAt: -1 });

        res.json(appointments);
    } catch (error) {
        console.error('Fetch appointments error:', error);
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});

// @route   GET /api/appointments/admin/all
// @desc    Get all appointments (Admin only)
// @access  Admin
router.get('/admin/all', adminAuth, async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate('expertId', 'name specialty location')
            .populate('userId', 'name email mobile')
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        console.error('Fetch all appointments error:', error);
        res.status(500).json({ message: 'Error fetching all appointments' });
    }
});

// @route   PATCH /api/appointments/:id/status
// @desc    Update appointment status (Admin only)
// @access  Admin
router.patch('/:id/status', adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('expertId', 'name specialty');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Update appointment status error:', error);
        res.status(500).json({ message: 'Error updating appointment status' });
    }
});

module.exports = router;
