var userController = require('./../controllers/userController.js');
var cameraDBController = require('./../controllers/cameraDBController.js');
var manufacturerController = require('./../controllers/manufacturerController.js');

module.exports = function(app){
    app.post('/register', function(req,res){
        userController.register(req,res);
    });
    app.post('/login', function(req,res){
        userController.login(req,res);
    });
    app.post('/addManufacturer', function(req,res){
        manufacturerController.addManufacturer(req,res);
    });
    app.get('/deleteManufacturer/:manufacturerID', function(req,res){
        manufacturerController.deleteManufacturer(req,res);
    });
    app.get('/deleteMount/:manufacturerID/:mount', function(req,res){
        manufacturerController.deleteMount(req,res);
    });
    app.post('/addCamera', function(req,res){
        cameraDBController.addCamera(req,res);
    });
    app.get('/checkCameras/:manufacturerID', function(req,res){
        cameraDBController.checkCameras(req,res);
    });
    app.get('/deleteCamera/:cameraID', function(req,res){
        cameraDBController.deleteCamera(req,res);
    });
    app.post('/addLens', function(req,res){
        cameraDBController.addLens(req,res);
    });
    app.get('/checkLenses/:manufacturerID', function(req,res){
        cameraDBController.checkLenses(req,res);
    });
    app.get('/deleteLens/:lensID', function(req,res){
        cameraDBController.deleteLens(req,res);
    });
    app.get('/checkManufacturers', function(req,res){
        manufacturerController.checkManufacturers(req,res);
    });
    app.get('/checkManufacturer/:manufacturer', function(req,res){
        manufacturerController.checkManufacturer(req,res);
    });
    app.post('/addMount/:manufacturerID', function(req,res){
        manufacturerController.addMount(req,res);
    });
    
}