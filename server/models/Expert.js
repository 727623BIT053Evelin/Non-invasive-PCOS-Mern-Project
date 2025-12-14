const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        required: true,
        enum: ['Gynecologist', 'Endocrinologist', 'Nutritionist', 'Therapist']
    },
    location: {
        type: String,
        required: true
    },
    contactEmail: String,
    contactPhone: String,
    bio: {
        type: String,
        default: ''
    },
    imageUrl: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expert', expertSchema);
