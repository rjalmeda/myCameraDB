app.controller('manufacturerListController', function($scope, $location, adminManufacturerFactory){
    $scope.manufacturers = [
        "Nikon",
        "Canon",
        "Sony"
    ];
    $scope.checkManufacturer = function(){
        adminManufacturerFactory.checkManufacturers(function(data){
            console.log(data)
            if(data.data.manufacturers){
                $scope.manufacturers = data.data.manufacturers;
                console.log($scope.manufacturers);
            }
        })
    };
    $scope.checkManufacturer();
})