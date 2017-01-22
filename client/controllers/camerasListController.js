app.controller('camerasListController', function($scope, $location, $routeParams, adminFactory){
    $scope.manufacturer = {};
    $scope.cameras = [];
    $scope.mounts = {};
    $scope.checkCameras = function(){
        console.log($scope.manufacturer);
        adminFactory.checkCameras($scope.manufacturer._id, function(data){
            console.log(data);
            if(data.data.success){
                $scope.cameras = data.data.cameras;
            };
        });
    };
    $scope.checkManufacturer = function(){
        adminFactory.checkManufacturer($routeParams.manufacturer, function(data){
            console.log(data);
            if(data.data.success){
                $scope.manufacturer = data.data.manufacturer;
                $scope.mounts = {};
                for(var i = 0; i < $scope.manufacturer.mounts.length; i++){
                    $scope.mounts[$scope.manufacturer.mounts[i]] = false;
                };
                console.log($scope.mounts);
                $scope.checkCameras();
            } else {
                
            };
        });
    };
    $scope.checkManufacturer();
    $scope.addCamera = function(){
        console.log("addCamera");
        $scope.errors = [];
        if(!$scope.camera){
            return console.log('no camera');
        } else if (!$scope.camera.type){
            $scope.errors.push('no camera type');
        } else if (!$scope.camera.name){
            $scope.errors.push('no camera name');
        } else if (!$scope.camera.model){
            $scope.errors.push('no camera model');
        } else if (!$scope.camera.megapixel){
            $scope.errors.push('no camera MP');
        } else if (!$scope.camera.crop){
            $scope.errors.push('no camera crop');
        } else if (!$scope.camera.sensor){
            $scope.errors.push('no camera sensor');
        } else if (!$scope.camera.weight){
            $scope.errors.push('no camera weight');
        } else if (!$scope.camera.price){
            $scope.errors.push('no camera price');
        } else if (!$scope.camera.year){
            $scope.errors.push('no camera year');
        } else if (!$scope.camera.quarter){
            $scope.errors.push('no camera quarter');
        } else {
            $scope.camera.mountable = [];
            if(!$scope.mounts){
                console.log("no mounts chosen");
            } else {
                for(var mount in $scope.mounts){
                    if($scope.mounts[mount]){
                        $scope.camera.mountable.push(mount);
                    }
                }
                console.log($scope.camera.mountable);
            };
            $scope.camera.fk_manufacturer = $scope.manufacturer._id;
            adminFactory.addCamera($scope.camera, function(data){
                $scope.camera = {};
                for(var mounts in $scope.mounts){
                    $scope.mounts[mount] = false;
                };
                console.log(data);
                $scope.checkCameras();
            })
        }
    };
    $scope.deleteCamera = function(cameraID){
        adminFactory.deleteCamera(cameraID, function(data){
            console.log(data);
            $scope.checkCameras();
        });
    };
})