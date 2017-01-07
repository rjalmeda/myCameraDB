var mongoose = require('mongoose');
var ManufacturerSchema = mongoose.Schema({
    name: String,
    mounts: [String]
});
mongoose.model('Manufacturer', ManufacturerSchema);