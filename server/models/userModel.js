var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    alias: String,
    gearbox: {
        cameras:[{default: [{}]}],
        lenses: [{default: [{}]}],
        accessories: [{default: [{}]}]
    },
    profilePic: String,
    gearLevel: {type: Number, default: 0},
    gearXP: {type: Number, default: 0},
    proLevel: {type: Number, default: 0},
    proXP: {type: Number, default: 0},
    NetworkLevel: {type: Number, default: 0},
    NetworkXP: {type: Number, default: 0},
    flickr: String,
    facebook: String,
    twitter: String
});
mongoose.model('User', UserSchema);