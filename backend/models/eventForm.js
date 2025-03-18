// backend/models/eventModel.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: true },
    religious: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true,
});

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;
