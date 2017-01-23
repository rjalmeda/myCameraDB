app.factory('gearboxFactory', function($http){
    var factory = {};
    var gearbox = {};
    factory.updateGearbox = function(callback){
        $http.get('/updateGearbox').then(function(data){
            callback(data);
        })
    };
    
    factory.listManufacturers = function(callback){
        $http.get('/listManufacturers').then(function(data){
            callback(data);
        });
    };
    
    factory.changeLensManufacturer = function(manufacturerID, callback){
        $http.get('/changeLensManufacturer/'+manufacturerID).then(function(data){
            callback(data);
        });
    };
    
    factory.changeCameraManufacturer = function(manufacturerID, type, callback){
        $http.get('/changeCameraManufacturer/'+manufacturerID+'/'+type).then(function(data){
            callback(data);
        });
    };
    
    factory.addGearboxLens = function(lens, callback){
        $http.post('/addGearboxLens', lens).then(function(data){
            callback(data);
        });
    };
    
    factory.addGearboxCamera = function(camera, callback){
        $http.post('/addGearboxCamera', camera).then(function(data){
            callback(data);
        });
    };
    
    factory.clearGearboxCameras = function(callback){
        $http.delete('/clearGearboxCameras').then(function(data){
            callback(data);
        });
    };
    
    factory.clearGearboxLenses = function(callback){
        $http.delete('/clearGearboxLenses').then(function(data){
            callback(data);
        });
    };
    
    return factory;
})