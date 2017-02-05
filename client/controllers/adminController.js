app.controller('adminController', function($scope, $location, $route, adminFactory){
    $scope.manufacturer = {};
    $scope.lens = {};
    $scope.camera = {};
    $scope.admin = {};
    $scope.errors = [];
    $scope.addManufacturer = function(){
        $scope.errors = [];
        if(!$scope.manufacturer){
            return console.log('no manufacturer name');
        } else if (!$scope.manufacturer.name){
            return console.log('no manufacturer name');
        } else {
            adminFactory.addManufacturer($scope.manufacturer, function(data){
                $scope.manufacturer = {};
                console.log(data);
                console.log("checked manufacturers");
                console.log($location.url);
                return $route.reload();
            })
        }
    };
    $scope.addCamera = function(){
        console.log("addCamera");
        $scope.errors = [];
        if(!$scope.camera){
            return console.log('no camera');
        } else if (!$scope.camera.fs_manufacturer){
            $scope.errors.push('no camera manufacturer');
        } else if (!$scope.camera.name){
            $scope.errors.push('no camera name');
        } else if (!$scope.camera.model){
            $scope.errors.push('no camera model');
        } else if (!$scope.camera.megapixel){
            $scope.errors.push('no camera MP');
        } else if (!$scope.camera.format){
            $scope.errors.push('no camera format');
        } else if (!$scope.camera.sensor){
            $scope.errors.push('no camera sensor');
        } else if (!$scope.camera.mount){
            $scope.errors.push('no camera mount');
        } else if (!$scope.camera.weight){
            $scope.errors.push('no camera weight');
        } else if (!$scope.camera.price){
            $scope.errors.push('no camera price');
        } else {
            adminFactory.addCamera($scope.camera, function(data){
                $scope.camera = {};
                console.log(data);
            })
        }
    };
    $scope.addLens = function(){
        $scope.errors = [];
        if(!$scope.lens){
            return console.log('no lens');
        } else if (!$scope.lens.fk_manufacturer){
            $scope.errors.push('no lens manufacturer');
        } else if (!scope.lens.name){
            $scope.errors.push('no lens name');
        } else if (!$scope.lens.model){
            $scope.errors.push('no lens model');
        } else if (!$scope.lens.focalLengh){
            $scope.errors.push('no lens focal lengh');
        } else if (!$scope.lens.minFocal){
            $scope.errors.push('no lens min focal');
        } else if (!$scope.lens.maxFocal){
            $scope.errors.push('no lens max focal');
        } else if (!$scope.lens.type){
            $scope.errors.push('no lens type');
        } else if (!$scope.lens.aperture){
            $scope.errors.push('no lens aperture');
        } else if (!$scope.lens.minAperture){
            $scope.errors.push('no lens min aperture');
        } else if (!$scope.lens.maxAperture){
            $scope.errors.push('no lens max aperture');
        } else if (!$scope.lens.weight){
            $scope.errors.push('no lens weight');
        } else if (!$scope.lens.price){
            $scope.errors.push('no lens price');
        } else {
            adminFactory.addLens($scope.lens, function(data){
                $scope.lens = {};
                adminFactory.addLens($scope.lens, function(data){
                    console.log(data);
                })
            })
        }
    }
});