const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inputFeatures: {
        'Age (yrs)': Number,
        'Weight (Kg)': Number,
        'Height(Cm)': Number,
        'BMI': Number,
        'Pulse rate(bpm)': Number,
        'RR (breaths/min)': Number,
        'Hb(g/dl)': Number,
        'Cycle(R/I)': Number,
        'Cycle length(days)': Number,
        'Marraige Status (Yrs)': Number,
        'Pregnant(Y/N)': Number,
        'No. of abortions': Number,
        'Weight gain(Y/N)': Number,
        'hair growth(Y/N)': Number,
        'Skin darkening (Y/N)': Number,
        'Hair loss(Y/N)': Number,
        'Pimples(Y/N)': Number,
        'Fast food (Y/N)': Number,
        'Reg.Exercise(Y/N)': Number
    },
    prediction: {
        type: Number,
        required: true,
        enum: [0, 1]
    },
    probabilities: {
        no_pcos: Number,
        pcos: Number
    },
    shapValues: {
        type: Map,
        of: Number
    },
    topFeatures: [{
        feature: String,
        impact: Number
    }],
    reportUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Prediction', predictionSchema);
