var mongoose = require('mongoose');
var Manufacturer = mongoose.model('Manufacturer');
module.exports = (function(){
    return{
        addManufacturer: function(req,res){
            Manufacturer.findOne({name: req.body.name}, function(err,manufacturer){
                if(err){
                    return res.json({success: false, errors: err})
                } else if (manufacturer){
                    return res.json({success: false})
                } else {
                    var newManufacturer = new Manufacturer(req.body);
                    newManufacturer.mounts = [];
                    newManufacturer.save(function(err1, manu1){
                        if(err1){
                            return res.json({success: false, errors: err1})
                        } else if (manu1){
                            return res.json({success: true, manufacturer: manu1})
                        }
                    })
                }
            })
        },
        deleteManufacturer: function(req,res){
            Manufacturer.remove({_id: req.params.manufacturerID}, function(err){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true})
                }
            })
        },
        checkManufacturers: function(req,res){
            Manufacturer.find({}, function(err, manufacturers){
                if(err){
                    return res.json({errors: err})
                } else {
                    return res.json({manufacturers: manufacturers})
                }
            })
        },
        checkManufacturer: function(req,res){
            Manufacturer.findOne({name: req.params.manufacturer}, function(err, manufacturer){
                if(err){
                    return res.json({success: false, errors: err})
                } else if (!manufacturer){
                    return res.json({success: false, manufacturer: {}})
                } else {
                    return res.json({success: true, manufacturer: manufacturer})
                }
            })
        },
        addMount: function(req,res){
            Manufacturer.findOne({_id: req.params.manufacturerID}, function(err, manufacturer){
                if(err){
                    return res.json({success: false, errors: err})
                } else if(!manufacturer){
                    return res.json({success: false, errors: "manufacturer not found"})
                } else {
                    for(var i = 0; i < manufacturer.mounts.length; i++){
                        if(manufacturer.mounts[i] === req.body.name){
                            return res.json({success: false, errors: "name already used"});
                        };
                    };
                    manufacturer.mounts.push(req.body.name);
                    manufacturer.save(function(err1){
                        if(err1){
                            return res.json({success: false, errors: err1})
                        } else {
                            return res.json({success: true})
                        }
                    })
                }
            })
        },
        deleteMount: function(req,res){
            Manufacturer.findOne({_id: req.params.manufacturerID}, function(err, manufacturer){
                if(err){
                    return res.json({success: false, errors: err});
                } else if(!manufacturer){
                    return res.json({success: false, errors: "manufacturer not found"})
                } else {
                    for (var i = 0; i < manufacturer.mounts.length; i++){
                        console.log(manufacturer.mounts[i]);
                        console.log(req.params.mount);
                        if(manufacturer.mounts[i] === req.params.mount){
                            console.log("match");
                            manufacturer.mounts.splice(i, 1);
                            manufacturer.save(function(err1){
                                if(err1){
                                    return res.json({success: false, errors:err1})
                                } else {
                                    return res.json({success: true});
                                };
                            })
                        }
                    }
                }
            })
        }
    }
})();