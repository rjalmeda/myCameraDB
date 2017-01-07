app.factory('adminManufacturerFactory', function($http){
    var factory = {};
    factory.checkManufacturers = function(callback){
        $http.get('/checkManufacturers').then(function(data){
            callback(data);
        })
    };
    return factory;
});