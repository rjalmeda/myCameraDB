app.factory('amazonAPIFactory', function($http){
    var factory = {};
    factory.checkAmazonItem = function(ASIN, callback){
        $http.get('/checkAmazonItem/'+ASIN).then(function(data){
            callback(data);
        });
    };
    return factory;
});