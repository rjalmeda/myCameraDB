app.controller('sideNavBarController', function($scope, $location, sessionFactory, adminFactory){
    $scope.updateGearbox = function(){
        console.log($scope.user.gearLevel + " here is your gear level")
        if(!$scope.user){
            return console.log("user not logged in");
        } else if ($scope.user.gearLevel === 0){
            $scope.gearboxName = "camera pouch";
        } else if ($scope.user.gearLevel === 1){
            $scope.gearboxName = "Shoe Box";
        } else if ($scope.user.gearLevel === 2){
            $scope.gearboxName = "Gear Shelf";
        } else {
            $scope.gearboxName = "Gear Box";
            console.log("else");
        }
    };
    $scope.user = {};
    function checkSessionUser(){
        sessionFactory.checkSessionUser(function(data){
            console.log("check session");
            $scope.user = data.data.user;
            console.log(data);
            if(!data.data.success){
                return $location.url('/login');
            };
            $scope.updateGearbox();
        })
    };
    checkSessionUser();
    $scope.gearboxName = "Gear Box";
//    $scope.updateGearbox();
})