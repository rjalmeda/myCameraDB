app.controller('sideNavBarController', function($scope, sessionFactory){
    function checkSessionUser(){
        sessionFactory.checkSessionUser(function(data){
            console.log(data);
        })
    };
    checkSessionUser();
    $scope.gearbox = "Gear Box"
})