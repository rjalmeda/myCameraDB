app.controller('gearboxController', function($scope, $location, gearboxFactory){
    
    
//    $scope.addWindow = false;
//    $scope.addItemWindow = function(){
//        console.log("WINDOW!");
//        $scope.addWindow = true;
//    };
    $scope.newCameraErrors = [];
    $scope.newLensErrors = [];
    $scope.addCameraWindow = false;
    $scope.addCameraButton = "Add Camera";
    $scope.addLensWindow = false;
    $scope.addLensButton = "Add Lens";
    $scope.addAccessoryWindow = false;
    $scope.addAccessoryButton = "Add Accessory";
    $scope.manufacturers = [];
    $scope.lenses = [];
    $scope.cameras = [];
    $scope.bags = [];
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
    $scope.newCamera = {};
    $scope.newCameraPic = "";
    $scope.newLens = {};
    $scope.newLensPic = "";
    
    function updateGearbox(){
        gearboxFactory.updateGearbox(function(data){
            console.log(data);
            $scope.gearbox = data.data.user.gearbox;
            $scope.lenses = $scope.gearbox.lenses.fk_item;
            $scope.cameras = $scope.gearbox.cameras.fk_item;
            $scope.bags = $scope.gearbox.bags.fk_item;
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
        if(!$scope.targetCamera || !$scope.targetCamera.type){
            $scope.targetCamera = {
                type: ""
            };
        }
        gearboxFactory.changeCameraManufacturer($scope.cameraManufacturerID, $scope.targetCamera.type, function(data){
            console.log(data);
            $scope.targetCameras = data.data.cameras;
        })
    };
    
    $scope.updateNewCameraPicture = function(){
        console.log($scope.newListCamera);
        var data = $scope.newListCamera.split('<->');
        $scope.newCamera.fk_item = data[0];
        $scope.newCameraPic = data[1];
        
    };
    
    $scope.updateNewLensPicture = function(){
        console.log($scope.newListLens);
        var data = $scope.newListLens.split('<->');
        $scope.newLens.fk_item = data[0];
        $scope.newLensPic = data[1];
    }
    
//    $scope.enableAddCamera = function(){
//        if(!$scope.addCameraWindow){
//            console.log("add Camera");
//            $scope.addCameraWindow = true;
//            $scope.addCameraButton = "cancel";
//        } else {
//            console.log("disable camera");
//            $scope.addCameraWindow = false;
//            $scope.addCameraButton = "Add Camera";
//        }
//    };
//    
//    $scope.enableAddLens = function(){
//        if(!$scope.addLensWindow){
//            $scope.addLensWindow = true;
//            $scope.addLensButton = "cancel";
//        } else {
//            $scope.addLensWindow = false;
//            $scope.addLensButton = "Add Lens";
//        }
//    };
//    
//    $scope.enableAddAccessory = function(){
//        if(!$scope.addAccessoryWindow){
//            console.log("toggled on");
//            $scope.addAccessoryWindow = true;
//            $scope.addAccessoryButton = "cancel";
//        } else {
//            console.log("toggled Off");
//            $scope.addAccessoryWindow = false;
//            $scope.addAccessoryButton = "Add Accessory";
//        }
//    };
    
    $scope.shoutout = function(){
        console.log("shout out");
    };
    
//    <----- old gear add functions --->
//    $scope.addGearboxLens = function(){
//        console.log($scope.lens);
//        gearboxFactory.addGearboxLens($scope.lens, function(data){
//            console.log(data);
//            $scope.lens = {};
//            updateGearbox();
//        });
//    };
//    
//    $scope.addGearboxCamera = function(){
//        console.log($scope.camera);
//        gearboxFactory.addGearboxCamera($scope.camera, function(data){
//            console.log(data);
//            $scope.camera = {};
//            updateGearbox();
//        })
//    };
    
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
    };
    
    $scope.addCameraWindow = false;
    $scope.addLensWindow = false;
    $scope.addBagWindow = false;
    
    $scope.toggleAddCamera = function(){
        $scope.addCameraWindow = !$scope.addCameraWindow;
    };
    
    $scope.toggleAddLens = function(){
        $scope.addLensWindow = !$scope.addLensWindow;
    };
    
    $scope.toggleAddBag = function(){
        $scope.addBagWindow = !$scope.addBagWindow;
    };
    
    $scope.ping = function(){
        console.log("ping");
    };
    
    $scope.addGearboxItem = function(type){
        console.log("add ITEM!");
        if(type === 'camera'){
            $scope.newCameraErrors = [];
            if(!$scope.newCamera){
                $scope.newCameraErrors.push("New Camera is empty");
            };
            if(!$scope.newCamera.name || $scope.newCamera.name.length < 3){
                $scope.newCameraErrors.push("Please add an item name");
            };
            if(!$scope.newCamera.serial){
                $scope.newCameraErrors.push("no camera serial");
            };
            if(!$scope.newCamera.fk_item || $scope.newCamera.fk_item.length < 4){
                $scope.newCameraErrors.push("please choose a camera from the list");
            };
            if($scope.newCameraErrors.length > 0){
                return $scope.newCameraErrors.push("errors found");
            } else {
                $scope.newCamera.type = type;
                gearboxFactory.addGearboxItem($scope.newCamera, function(data){
                    console.log(data);
                    if(data.data.success){
                        updateGearbox();
                        $scope.newCamera = {};
                    }
                })
            }
        } else if(type === 'lens'){
            $scope.newLensErrors = [];
            if(!$scope.newLens){
                $scope.newLensErrors.push("New lens is empty");
            };
            if(!$scope.newLens.name || $scope.newLens.name.length < 3){
                $scope.newLensErrors.push("Please add an item name");
            };
            if(!$scope.newLens.serial){
                $scope.newLensErrors.push("no lens serial");
            }
            if(!$scope.newLens.fk_item || $scope.newLens.fk_item.length < 4){
                $scope.newLensErrors.push("please choose a lens from the list");
            };
            if($scope.newLens.length > 0){
                return $scope.newLensErrors.push("errors found");
            } else {
                $scope.newLens.type = type;
                gearboxFactory.addGearboxItem($scope.newLens, function(data){
                    console.log(data);
                    if(data.data.success){
                        updateGearbox();
                        $scope.newLens = {};
                    }
                })
            }
        }
        
    };
})