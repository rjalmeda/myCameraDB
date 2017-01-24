var mongoose = require('mongoose');
var SetupSchema = mongoose.Schema({
    fk_bag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bag'
    },
    fk_cameras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camera'
    }],
    fk_lenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lens'
    }]
});
mongoose.model('Setup', SetupSchema); 