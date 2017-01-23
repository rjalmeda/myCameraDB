app.controller('gearboxController', function($scope, $location, gearboxFactory){
    
    
//    $scope.addWindow = false;
//    $scope.addItemWindow = function(){
//        console.log("WINDOW!");
//        $scope.addWindow = true;
//    };
    $scope.addCameraWindow = false;
    $scope.addCameraButton = "Add Camera";
    $scope.addLensWindow = false;
    $scope.addLensButton = "Add Lens";
    $scope.addAccessoryWindow = false;
    $scope.addAccessoryButton = "Add Accessory";
    $scope.manufacturers = [];
    $scope.lenses = [];
    $scope.cameras = [];
    $scope.gearbox = {};
    $scope.type = "";
    $scope.types = [
        'DSLR',
        'Mirrorless',
        'Rangefinder',
        'Medium Format',
        'Point & Shoot',
        'Film SLR',
        'Film Point & Shoot',
        'Action'
    ];
    
    function updateGearbox(){
        gearboxFactory.updateGearbox(function(data){
            console.log(data);
            $scope.gearbox = data.data.user.gearbox;
            $scope.lenses = $scope.gearbox.lenses;
            $scope.cameras = $scope.gearbox.cameras;
        });
    };
    updateGearbox();
    
    $scope.listManufacturers = function(){
        gearboxFactory.listManufacturers(function(data){
            console.log(data);
            $scope.manufacturers = data.data.manufacturers;
        })
    };
    $scope.listManufacturers();
    
    $scope.changeLensManufacturer = function(){
        if($scope.lensManufacturerID === "custom"){
            return console.log("custom lens");
        }
        console.log("change lens manufacturer");
        console.log($scope.lensManufacturerID);
        
        gearboxFactory.changeLensManufacturer($scope.lensManufacturerID, function(data){
            console.log(data);
            $scope.targetLenses = data.data.lenses;
        })
    };
    
    $scope.changeCameraManufacturer = function(){
        if($scope.cameraManufacturerID === "custom"){
            return console.log("custom camera");
        }
        console.log("Change camera manufacturer");
        console.log($scope.cameraManufacturerID);
        if(!$scope.camera || !$scope.camera.type){
            $scope.camera = {
                type: ""
            };
        }
        gearboxFactory.changeCameraManufacturer($scope.cameraManufacturerID, $scope.camera.type, function(data){
            console.log(data);
            $scope.targetCameras = data.data.cameras;
        })
    }
    
    $scope.enableAddCamera = function(){
        if(!$scope.addCameraWindow){
            console.log("add Camera");
            $scope.addCameraWindow = true;
            $scope.addCameraButton = "cancel";
        } else {
            console.log("disable camera");
            $scope.addCameraWindow = false;
            $scope.addCameraButton = "Add Camera";
        }
    };
    
    $scope.enableAddLens = function(){
        if(!$scope.addLensWindow){
            $scope.addLensWindow = true;
            $scope.addLensButton = "cancel";
        } else {
            $scope.addLensWindow = false;
            $scope.addLensButton = "Add Lens";
        }
    };
    
    $scope.enableAddAccessory = function(){
        if(!$scope.addAccessoryWindow){
            console.log("toggled on");
            $scope.addAccessoryWindow = true;
            $scope.addAccessoryButton = "cancel";
        } else {
            console.log("toggled Off");
            $scope.addAccessoryWindow = false;
            $scope.addAccessoryButton = "Add Accessory";
        }
    };
    
    $scope.shoutout = function(){
        console.log("shout out");
    };
    
    $scope.addGearboxLens = function(){
        console.log($scope.lens);
        gearboxFactory.addGearboxLens($scope.lens, function(data){
            console.log(data);
            $scope.lens = {};
            updateGearbox();
        });
    };
    
    $scope.addGearboxCamera = function(){
        console.log($scope.camera);
        gearboxFactory.addGearboxCamera($scope.camera, function(data){
            console.log(data);
            $scope.camera = {};
            updateGearbox();
        })
    };
    
    $scope.clearGearboxCameras = function(){
        gearboxFactory.clearGearboxCameras(function(data){
            console.log(data);
            updateGearbox();
        })
    };
    
    $scope.clearGearboxLenses = function(){
        gearboxFactory.clearGearboxLenses(function(data){
            console.log(data);
            updateGearbox();
        })
    }
})