var mongoose = require('mongoose');
var Lens = mongoose.model('Lens');
var Camera = mongoose.model('Camera');
var Bag = mongoose.model('Bag');
var Manufacturer = mongoose.model('Manufacturer');
module.exports = (function(){
    return {
        addCamera: function(req,res){
            Camera.findOne({model: req.body.model}, function(err, camera){
                if(err){
                    return res.json({success: false, errors: err})
//                } else if (camera){
//                    return res.json({success: false})
                } else {
                    Manufacturer.findOne({_id: req.body.fk_manufacturer}, function(err1, manu1){
                        if(err1){
                            return res.json({success: false, errors: err1})
                        } else if (!manu1){
                            return res.json({success: false, message: 'manufacturer not found'});
                        } else if (manu1){
                            var newCamera = new Camera(req.body);
                            newCamera.save(function(err2,camera2){
                                if(err2){
                                    return res.json({success:false, errors: err2})
                                } else if (camera2){
                                    return res.json({success: true, camera: camera2})
                                };
                            })
                        }
                    })
                }
            })
        },
        checkCameras: function(req,res){
            Camera.find({fk_manufacturer: req.params.manufacturerID}, function(err, cameras){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true, cameras: cameras})
                }
            })
        },
        deleteCamera: function(req,res){
            Camera.remove({_id: req.params.cameraID}, function(err){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true})
                }
            })
        },
        addLens: function(req,res){
            Lens.findOne({model: req.body.model}, function(err, lens){
                if(err){
                    return res.json({success:false, errors:err})
                } else if (lens){
                    return res.json({success: false})
                } else {
                    Manufacturer.findOne({_id: req.body.fk_manufacturer}, function(err1, manu1){
                        if(err1){
                            return res.json({success: false, errors: err1})
                        } else if (!manu1){
                            return res.json({success: false});
                        } else if (manu1){
                            var newLens = new Lens(req.body);
                            newLens.save(function(err2, lens2){
                                if(err2){
                                    return res.json({success: false, errors: err2})
                                } else if (lens2){
                                    return res.json({success: true, lens: newLens})
                                }
                            })
                        }
                    })
                }
            })
        },
        checkLenses: function(req,res){
            Lens.find({fk_manufacturer: req.params.manufacturerID}, function(err, lenses){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true, lenses: lenses})
                }
            })
        },
        deleteLens: function(req,res){
            Lens.remove({_id: req.params.lensID}, function(err){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true})
                }
            })
        },
        listManufacturers: function(req,res){
            Manufacturer.find({}, function(err, manufacturers){
                if(err){
                    return res.json({success: false, errors: err});
                } else {
                    return res.json({success: true, manufacturers: manufacturers});
                }
            })
        },
        changeLensManufacturer: function(req,res){
            Lens.find({fk_manufacturer: req.params.manufacturerID}, function(err, lenses){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true, lenses: lenses})
                }
            })
        },
        changeCameraManufacturer: function(req,res){
            var type;
            if(!req.params.cameraType){
                type = "";
            } else {
                type = req.params.cameraType;
            }
            Camera.find({fk_manufacturer: req.params.manufacturerID, type: type}, function(err, cameras){
                if(err){
                    return res.json({success: false, errors:err})
                } else {
                    return res.json({success: true, cameras: cameras})
                }
            })
        },
        checkBags: function(req,res){
            Bag.find({fk_manufacturer: req.params.manufacturerID}, function(err, bags){
                if(err){
                    return res.json({success: false, errors: err})
                } else {
                    return res.json({success: true, bags: bags})
                }
            })
        }
    }
})();