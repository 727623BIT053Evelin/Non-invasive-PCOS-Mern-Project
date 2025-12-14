const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: ['Workshop', 'Webinar', 'Live Chat', 'Q&A Session', 'Support Group', 'Other']
    },
    imageUrl: String,
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
