const mongoose = require('mongoose');

const userRegisterationSchema = new mongoose.Schema({
    id: { type: String },
    email: { type: String }
});

const UserRegisteration = mongoose.models.userregistration || mongoose.model('userregistration', userRegisterationSchema);

module.exports = UserRegisteration;
