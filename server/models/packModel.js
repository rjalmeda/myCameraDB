var mongoose = require('mongoose');
var PackSchema = mongoose.Schema({
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        model: 'User'
    },
    name: String,
    description: String,
    nickname: String,
    fk_items: [{
        type: mongoose.Schema.Types.ObjectId,
        model: 'Item'
    }],
    fk_bag: {
        type: mongoose.Schema.Types.ObjectId,
        model: 'Bag'
    },
    weight: Number,
    notes: String
});
mongoose.model('Pack', PackSchema);