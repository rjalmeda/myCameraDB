var mongoose = require('mongoose');
var BadgeSchema = mongoose.Schema({
    name: String,
    part: Number,
    setName: String,
    completeSet: [Number],
});
mongoose.model('Badge', BadgeSchema);