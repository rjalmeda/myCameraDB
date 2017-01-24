app.controller('bagsListController', function($scope, $location, $routeParams, adminFactory){
    console.log("Bag CONTROLLER");
    $scope.manufacturer = {};
    $scope.bags = [];
    
    $scope.checkBags = function(){
        console.log($scope.manufacturer);
        adminFactory.checkBags($scope.manufacturer._id, function(data){
            console.log(data);
            if(data.data.succes){
                $scope.bags = data.data.bags;
            }
        });
    };
    
    $scope.checkManufacturer = function(){
        adminFactory.checkManufacturer($routeParams.manufacturer, function(data){
            console.log(data);
            if(data.data.success){
                $scope.manufacturer = data.data.manufacturer;
                $scope.checkBags();
            } else {
                console.log("what happened?");
            }
        })
    };
    
    $scope.checkManufacturer();
});