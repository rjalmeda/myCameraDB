var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    alias: String,
    fk_gearbox: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gearbox'
    },
    profilePic: String,
    gearLevel: Number,
    gearXP: Number,
    proLevel: Number,
    proXP: Number,
    NetworkLevel: Number,
    NetworkXP: Number,
    flickr: String,
    facebook: String,
    twitter: String
});
mongoose.model('User', UserSchema);