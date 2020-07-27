let mongoose = require('mongoose');


let UserExperienceSchema = new mongoose.Schema({
    rating: {
        type: Number,
        minimum: 0,
        maximum: 5
    },
    review: String,
    status: {
        type: String,
        pattern: "^wishlist$|^started$|^finished$",
        required: true
    },
    date_started: Date,
    date_finished: Date,
    bookId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('UserExperience', UserExperienceSchema);