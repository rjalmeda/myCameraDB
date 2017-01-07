var mongoose = require('mongoose');
var AdminSchema = mongoose.Schema({
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Admin', AdminSchema);