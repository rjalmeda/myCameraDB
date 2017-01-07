var mongoose = require('mongoose');
var LensSchema = mongoose.Schema({
    fk_manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer'
    },
    name: String,
    model: String,
    mount: String,
    focalLength: String,
    minFocal: Number,
    maxFocal: Number,
    type: String,
    aperture: String,
    minAperture: Number,
    maxAperture: Number,
    weight: Number,
    price: Number
})
mongoose.model('Lens', LensSchema);