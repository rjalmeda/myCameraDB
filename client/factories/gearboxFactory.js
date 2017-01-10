app.factory('gearboxFactory', function($http, sessionFactory){
    var factory = {};
    var gearbox = {};
    factory.updateGearbox = function(){
        sessionFactory.checkSessionUser(function(data){
        console.log(data);
            if(data.data.success){
                gearbox = data.data.user.gearbox;
                console.log("gearbox refreshed");
                console.log(gearbox);
            }
        })
    };
    return factory;
})