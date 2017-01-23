var mongoose = require('mongoose');
var ItemLevelSchema = mongoose.Schema({
    name: String
});
mongoose.model('ItemLevel', ItemLevelSchema);