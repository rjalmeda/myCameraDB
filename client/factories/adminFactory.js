app.factory('adminFactory', function($http){
    var factory = {};
    factory.addManufacturer = function(manufacturer, callback){
        $http.post('/addManufacturer', manufacturer).then(function(data){
            callback(data);
        });
    };
    factory.deleteManufacturer = function(manufacturerID, callback){
        $http.get('/deleteManufacturer/' + manufacturerID).then(function(data){
            callback(data);
        });
    };
    factory.deleteMount = function(manufacturerID, mount, callback){
        $http.get('/deleteMount/' + manufacturerID + '/' + mount).then(function(data){
            callback(data);
        });
    };
    factory.addCamera = function(camera, callback){
        $http.post('/addCamera', camera).then(function(data){
            callback(data);
        });
    };
    factory.addLens = function(lens, callback){
        $http.post('/addLens', lens).then(function(data){
            callback(data);
        });
    };
    factory.deleteLens = function(lensID, callback){
        $http.get('/deleteLens/' + lensID).then(function(data){
            callback(data);
        });
    };
    factory.checkManufacturer = function(manufacturer, callback){
        $http.get('/checkManufacturer/' + manufacturer).then(function(data){
            callback(data);
        });
    };
    factory.checkCameras = function(manufacturerID, callback){
        $http.get('/checkCameras/' + manufacturerID).then(function(data){
            callback(data);
        });
    };
    factory.checkLenses = function(manufacturerID, callback){
        $http.get('/checkLenses/' + manufacturerID).then(function(data){
            callback(data);
        });
    };
    factory.deleteCamera = function(cameraID, callback){
        $http.get('/deleteCamera/' + cameraID).then(function(data){
            callback(data);
        });
    };
    factory.addMount = function(manufacturerID, mount, callback){
        $http.post('/addMount/' + manufacturerID, mount).then(function(data){
            callback(data);
        });
    };
    factory.checkBags = function(manufacturerID, callback){
        $http.get('/checkBags/' + manufacturerID).then(function(data){
            callback(data);
        });
    };
    return factory;
})