app.factory('loginFactory', function($http){
    var factory = {};
    factory.register = function(user, callback){
        $http.post('/register', user).then(function(data){
            callback(data);
        })
    };
    factory.login = function(user, callback){
        $http.post('/login', user).then(function(data){
            callback(data);
        })
    };
    return factory;
});