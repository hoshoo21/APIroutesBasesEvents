const mongoose = require('mongoose');

const comemntSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    eventId: { type: String },
    email: { type: String },
    comment: { type: String },
    date: { type: String },
});

const Comment = mongoose.models.comment || mongoose.model('comment', comemntSchema);

module.exports = Comment;

