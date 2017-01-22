var mongoose = require('mongoose');
var amazonCacheSchema = mongoose.Schema({
    ASIN: String,
    data: {}
});
mongoose.model('AmazonCache', amazonCacheSchema);