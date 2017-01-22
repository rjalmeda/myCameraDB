var mongoose = require('mongoose');
var AccessorySchema = mongoose.Schema({
    fk_manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer'
    },
    name: String,
    type: String,
    weight: String,
    price: String,
    year: Number,
    quarter: Number,
    amazonKeywords: String,
    amazonASIN: String,
    gearboxPic: String,
    pics: [String],
    infoLink: String
    
});
mongoose.model('Accessory', AccessorySchema)