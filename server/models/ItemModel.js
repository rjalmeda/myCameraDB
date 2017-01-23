var mongoose = require('mongoose');
var ItemSchema = mongoose.Schema({
    fk_user : {
        type: mongoose.Schema.Types.ObjectId,
        model: 'User'
    },
    type: String,
    fk_item: mongoose.Schema.Types.ObjectId,
    name: String,
    nickname: String,
    description: String,
    notes: String,
    serial: String,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        model: 'Pack'
    }
});
mongoose.model('Item', ItemSchema);