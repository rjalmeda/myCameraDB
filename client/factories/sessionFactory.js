app.factory('sessionFactory', function($http){
    var factory = {};
    factory.checkSessionUser = function(callback){
        $http.get('/checkSessionUser').then(function(data){
            callback(data);
        })
    };
    return factory;
})