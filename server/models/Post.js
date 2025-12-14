const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    group: {
        type: String,
        required: true,
        enum: [
            'Diet & Fitness for PCOS',
            'Ask the Doctor',
            'Mind & Body Wellness',
            'Motivation & Stories',
            'PCOS & Fertility Planning',
            'Supplements',
            'Recipes & Meal Plans',
            'General'
        ]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    imageUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
