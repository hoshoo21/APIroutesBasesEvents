const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    description: { type: String },
    location: { type: String },
    date: { type: String },
    image: { type: String }
});

const Event = mongoose.models.event || mongoose.model('event', eventSchema);

module.exports = event;

