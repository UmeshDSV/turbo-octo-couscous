const mongoose = require('mongoose')

const Movie = mongoose.model('Movie', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    released_on: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_on: {
        type: Date,
        default: new Date()
    },
    ratings: [{
        user_id: {
            type: Number
        },
        rating: {
            type: Number,
            default: 0
        },
        rated_on: {
            type: Date
        },
    }],
    average_rating: {
        type: Number,
        default: 0
    }
})

module.exports = Movie