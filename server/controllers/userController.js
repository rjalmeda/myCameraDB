var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');
var Lens = mongoose.model('Lens');
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
                    path: 'gearbox.lenses.fk_lens',
                    model: 'Lens'
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
        
        addGearboxLens: function(req,res){
            console.log(req.body);
            if(!req.session.user){
                return res.json({success: false, user: "none logged in"})
            } else {
                User.findOne({_id: req.session.user._id}, function(err, user){
                    if(err){
                        return res.json({success: false, message: "no user logged in", session: req.session})
                    } else if(!user){
                        return res.json({success: false, message: "no user logged in", session: req.session})
                    } else {
                        for(var i = 0; i < user.gearbox.lenses.length; i++){
                            if(req.body.serial === user.gearbox.lenses[i].serial && req.body.fk_lens === user.gearbox.lenses[i].fk_lens){
                                return res.json({success: false, message: "identical lens already added"})
                            }
                        };
                        user.gearbox.lenses.push(req.body);
                        user.save(function(err1){
                            if(err1){
                                return res.json({success: false, user: user})
                            } else {
                                return res.json({success: true, user: user})
                            }
                        })
                    }
                })
            }
        }
        
    }
})();