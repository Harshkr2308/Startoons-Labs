const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: { type: String, default: 'user' },
    name: String,
    email: String,
    password: String,
    count: { type: Number, default: 0 },
    gender: String,
    lastLoginDate: { type: Date, default: Date.now },
});


userSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, { $inc: { count: 1 }, $set: { lastLoginDate: Date.now() } });
    next();
});

module.exports = mongoose.model("User", userSchema);