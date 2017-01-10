app.controller('gearboxController', function($scope, $location, gearboxFactory){
    function updateGear(){
        gearboxFactory.updateGearbox();
    };
    updateGear();
    $scope.addItemWindow = function(){
        console.log("WINDOW!");
    };
})