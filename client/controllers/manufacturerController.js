app.controller('manufacturerController', function($scope, $location, $routeParams, adminFactory){
    $scope.manufacturer = {};
    $scope.newMount = {};
    $scope.delete = {
        name: ""
    };
    $scope.checkManufacturer = function(){
        adminFactory.checkManufacturer($routeParams.manufacturer, function(data){
            console.log(data);
            if(data.data.success){
                $scope.manufacturer = data.data.manufacturer;
            } else {
                console.log('dunno what happened')
            };
        });
    };
    $scope.checkManufacturer();
    $scope.addMount = function(){
        if(!$scope.newMount.name){
            console.log('no mount name');
        } else {
            adminFactory.addMount($scope.manufacturer._id, $scope.newMount, function(data){
                console.log(data);
                if(data.data.success){
                    $scope.newMount = {};
                    $scope.checkManufacturer();
                } else {
                    console.log('what happened again?');
                    console.log(data.data.errors);
                }
            })
        }
    };
    $scope.deleteManufacturer = function(){
        if($scope.delete.name === $scope.manufacturer.name){
            adminFactory.deleteManufacturer($scope.manufacturer._id, function(data){
                console.log(data);
                $location.url('/admin');
            });
        } else {
            console.log("delete name does not match");
        }
    };
    $scope.deleteMount = function(mount){
        console.log(mount);
        adminFactory.deleteMount($scope.manufacturer._id, mount, function(data){
            console.log(data);
            $scope.checkManufacturer();
        });
    };
});