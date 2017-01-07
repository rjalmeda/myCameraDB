var mongoose = require('mongoose');
var CameraSchema = mongoose.Schema({
    fk_manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer'
    },
    type: String,
    name: String,
    model: String,
    megapixel: Number,
    crop: Number,
    sensor: String,
    mountable: [String],
    weight: Number,
    price: Number,
    year: Number,
    quarter: Number
});
mongoose.model('Camera', CameraSchema);