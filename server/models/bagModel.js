var mongoose = require('mongoose');
var BagSchema = mongoose.Schema({
    fk_manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer'
    },
    model: String,
    weightCap: {
        default: 0,
        type: Number
    },
    volumeCap: Number,
    weight: Number,
});