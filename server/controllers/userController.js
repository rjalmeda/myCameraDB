var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');
var Lens = mongoose.model('Lens');
var Camera = mongoose.model('Camera');
var Item = mongoose.model('Item');

module.exports = (function(){
    return {
        
        login: function(req,res){
            User.findOne({username: req.body.username}, function(err, user){
                if(err){
                    return res.json({errors: err, success: false});
                } else if(!user){
                    return res.json({success: false});
                } else if(user){
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        req.session.user = user;
                        req.session.save();
                        return res.json({success: true, user: user})
                    } else {
                        return res.json({success: false})
                    }
                }
            })
        },
        
        register: function(req,res){
            User.findOne({username: req.body.username}, function(err, user){
                if(err){
                    return res.json({errors: err, success: false});
                } else if (user){
                    return res.json({message: "user already exists", success: false})
                } else {
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.password = bcrypt.hashSync(req.body.password, 8);
                    newUser.email = req.body.email;
                    newUser.save(function(err1, user1){
                        if(err1){
                            return res.json({errors: err1, success: false});
                        } else if (user1){
                            return res.json({success: true, user: user1})
                        }
                    })
                }
            })
        },
        
        checkSessionUser: function(req,res){
            if(req.session.user){
                return res.json({success: true, user: req.session.user, session: req.session})
            } else {
                return res.json({success: false, message: "no user in session", session: req.session})
            }
        },
        updateGearbox: function(req,res){
            if(!req.session.user){
                console.log("1");
                return res.json({success: false});
            } else {
                User.findOne({_id: req.session.user._id})
                .populate({
                    path: 'gearbox.lenses.fk_item',
                    model: 'Item'
                })
                .populate({
                    path: 'gearbox.lenses.fk_item',
                    populate: {
                        path: 'fk_item',
                        model: 'Lens'
                    }
                })
                .populate({
                    path: 'gearbox.cameras.fk_item',
                    model: 'Item'
                })
                .populate({
                    path: 'gearbox.cameras.fk_item',
                    populate: {
                        path: 'fk_item',
                        model: 'Camera'
                    }
                })
                .populate({
                    path: 'gearbox.bags.fk_item',
                    model: 'Item'
                })
                .populate({
                    path: 'gearbox.bags.fk_item',
                    populate: {
                        path: 'fk_item',
                        model: 'Bag'
                    }
                })
                .exec(function(err, user){
                    if(err){
                        console.log("2");
                        return res.json({success: false, errors: err});
                    } else {
                        return res.json({success: true, user: user})
                    }
                })
            }
        },
        
//        Old functions to add gear to user's gearbox
//        addGearboxLens: function(req,res){
//            console.log(req.body);
//            if(!req.session.user){
//                return res.json({success: false, user: "none logged in"})
//            } else {
//                User.findOne({_id: req.session.user._id}, function(err, user){
//                    if(err){
//                        return res.json({success: false, message: "no user logged in", session: req.session})
//                    } else if(!user){
//                        return res.json({success: false, message: "no user logged in", session: req.session})
//                    } else {
//                        for(var i = 0; i < user.gearbox.lenses.length; i++){
//                            if(req.body.serial === user.gearbox.lenses[i].serial && req.body.fk_lens === user.gearbox.lenses[i].fk_lens){
//                                return res.json({success: false, message: "identical lens already added"})
//                            }
//                        };
//                        user.gearbox.lenses.push(req.body);
//                        user.save(function(err1){
//                            if(err1){
//                                return res.json({success: false, user: user})
//                            } else {
//                                return res.json({success: true, user: user})
//                            }
//                        })
//                    }
//                })
//            }
//        },
//        
//        addGearboxCamera: function(req,res){
//            console.log(req.body);
//            if(!req.session.user){
//                return res.json({success: false, user: "none logged in"})
//            } else {
//                User.findOne({_id: req.session.user._id}, function(err, user){
//                    if(err){
//                        return res.json({success: false, message: "no user logged in", session: req.session});
//                    } else if(!user){
//                        return res.json({success: false, message: "no user logged in", session: req.session});
//                    } else {
//                        for(var i = 0; i < user.gearbox.cameras.length; i++){
//                            if(req.body.serial === user.gearbox.cameras[i].serial && req.body.fk_camera === usr.gearbox.cameras[i].fk_camera){
//                                return res.json({success: false, message: "identical camera already added"})
//                            };
//                        };
//                        user.gearbox.cameras.push(req.body);
//                        user.save(function(err1){
//                            if(err1){
//                                return res.json({success: false, user: user})
//                            } else {
//                                return res.json({success: true, user: user})
//                            }
//                        })
//                    }
//                })
//            }
//        },
        
        addGearboxItem: function(req,res){
            if(!req.session.user){
                return res.json({sucess: false, user: "user not logged in"});
            } else {
                User.findOne({_id: req.session.user._id})
                .populate({
                    path: 'gearbox.cameras.fk_item',
                    model: 'Item'
                })
                .populate({
                    path: 'gearbox.lenses.fk_item',
                    model: 'Item'
                })
                .populate({
                    path: 'gearbox.bags.fk_item',
                    model: 'Item'
                })
                .exec(function(err, user){
                    if(err){
                        return res.json({success: false, errors: err});
                    } else if(!user){
                        return res.json({success: false, errors: "user not found"});
                    } else {
                        Item.find({fk_item: req.body.fk_item, serial: req.body.serial}, function(err, items){
                            if(err){
                                return res.json({success: false, errors: err});
                            } else if(items.length > 0){
                                return res.json({success: false, errors: "item already exists", items: items});
                            } else {
                                if(req.body.type === "camera"){
                                    for(var i = 0; i < user.gearbox.cameras.fk_item.length; i++){
                                        if(user.gearbox.cameras.fk_item[i].serial === req.body.serial && user.gearbox.cameras.fk_item[i].fk_item === req.body.fk_item){
                                            return res.json({success: false, errors: "item is already in your gearbox"});
                                        }
                                    }
                                    var newItem = new Item(req.body);
                                    newItem.save(function(err){
                                        if(err){
                                            return res.json({success: false, errors: err});
                                        } else {
                                            user.gearbox.cameras.fk_item.push(newItem);
                                            user.save(function(err){
                                                if(err){
                                                    return res.json({success: false, errors: err, message: "error saving user after adding gear"});
                                                } else {
                                                    return res.json({success: true, user: user});
                                                }
                                            })
                                        }
                                    })
                                } else if(req.body.type === "lens"){
                                    for(var i = 0; i < user.gearbox.lenses.fk_item.length; i++){
                                        if(user.gearbox.lenses.fk_item[i].serial === req.body.serial && user.gearbox.lenses.fk_item[i].fk_item === req.body.fk_item){
                                            return res.json({success: false, errors: "item is already in your gearbox"});
                                        }
                                    }
                                    var newItem = new Item(req.body);
                                    newItem.save(function(err){
                                        if(err){
                                            return res.json({success: false, errors: err});
                                        } else {
                                            user.gearbox.lenses.fk_item.push(newItem);
                                            user.save(function(err){
                                                if(err){
                                                    return res.json({success: false, errors: err, message: "error saving user after adding gear"});
                                                } else {
                                                    return res.json({success: true, user: user});
                                                }
                                            })
                                        }
                                    })
                                } else if(req.body.type === "bag"){
                                    for(var i = 0; i < user.gearbox.bags.fk_item.length; i++){
                                        if(user.gearbox.bags.fk_item[i].serial === req.body.serial && user.gearbox.bags.fk_item[i].fk_item === req.body.fk_item){
                                            return res.json({success: false, errors: "item is already in your gearbox"});
                                        }
                                    }
                                    var newItem = new Item(req.body);
                                    newItem.save(function(err){
                                        if(err){
                                            return res.json({success: false, errors: err});
                                        } else {
                                            user.gearbox.bags.fk_item.push(newItem);
                                            user.save(function(err){
                                                if(err){
                                                    return res.json({success: false, errors: err, message: "error saving user after adding gear"});
                                                } else {
                                                    return res.json({success: true, user: user});
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        },
        
        clearGearboxCameras: function(req,res){
            if(!req.session.user){
                return res.json({success: false, user: "none logged in"});
            } else {
                User.findOne({_id: req.session.user._id}, function(err, user){
                    if(err){
                        return res.json({success: false, errors: err});
                    } else {
                        user.gearbox.cameras = [];
                        user.save(function(err1){
                            if(err1){
                                return res.json({success: false, errors: err1});
                            } else {
                                return res.json({success: true, user: user});
                            }
                        })
                    }
                })
            }
        },
        
        clearGearboxLenses: function(req,res){
            if(!req.session.user){
                return res.json({success: false, user: "none logged in"});
            } else {
                User.findOne({_id: req.session.user._id}, function(err, user){
                    if(err){
                        return res.json({success: false, errors: err});
                    } else {
                        user.gearbox.lenses = [];
                        user.save(function(err1){
                            if(err1){
                                return res.json({success: false, errors: err1});
                            } else {
                                return res.json({success: true, user: user});
                            }
                        })
                    }
                })
            }
        }
        
    }
})();