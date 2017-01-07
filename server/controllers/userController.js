var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');
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
        }
        
    }
})();