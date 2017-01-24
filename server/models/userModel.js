var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    alias: String,
//    gearbox: {
//        cameras:[{
//            fk_camera: {
//                type: mongoose.Schema.Types.ObjectId,
//                ref: 'Camera'
//            },
//            name: String,
//            notes: String,
//            serial: String
//        }],
//        lenses: [{
//            fk_lens: {
//                type: mongoose.Schema.Types.ObjectId,
//                ref: 'Lens'
//            },
//            name: String,
//            notes: String,
//            serial: String
//        }],
//        bags: [{
//            
//        }],
//        accessories: [{}]
//    },
    gearbox: {
        cameras: {
            fk_item: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }]
        },
        lenses: {
            fk_item: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }]
        },
        bags: {
            fk_item: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }]
        }
    },
    setups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Setup'
    }],
    profilePic: String,
    gearLevel: {type: Number, default: 0},
    gearXP: {type: Number, default: 0},
    proLevel: {type: Number, default: 0},
    proXP: {type: Number, default: 0},
    NetworkLevel: {type: Number, default: 0},
    NetworkXP: {type: Number, default: 0},
    flickr: String,
    facebook: String,
    twitter: String
});
mongoose.model('User', UserSchema);