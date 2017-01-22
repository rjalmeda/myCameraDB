app.controller('lensListController', function($scope, $location, $routeParams, adminFactory){
    $scope.manufacturer = {};
    $scope.lenses = [];
    $scope.errors = [];
    $scope.checkLenses = function(){
        console.log($scope.manufacturer);
        adminFactory.checkLenses($scope.manufacturer._id, function(data){
            console.log(data);
            if(data.data.success){
                $scope.lenses = data.data.lenses
            };
        });
    };
    $scope.checkManufacturer = function(){
        adminFactory.checkManufacturer($routeParams.manufacturer, function(data){
            console.log(data);
            if(data.data.success){
                $scope.manufacturer = data.data.manufacturer;
                $scope.checkLenses();
            } else {
                
            };
        });
    };
    
    $scope.editLens = function(targetLens){
        $scope.lens = targetLens;
    };
    
    $scope.checkManufacturer();
    $scope.addLens = function(){
        console.log("add Lens")
        $scope.errors = [];
        if(!$scope.lens){
            return console.log('no lens');
        } else if (!$scope.lens.name){
            $scope.errors.push('no lens name');
        } else if (!$scope.lens.model){
            $scope.errors.push('no lens model');
        } else if (!$scope.lens.mount){
            $scope.errors.push('no lens mount chosen');
        } else if (!$scope.lens.focalLength){
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
            $scope.lens.fk_manufacturer = $scope.manufacturer._id;
            adminFactory.addLens($scope.lens, function(data){
                $scope.lens = {};
                $scope.checkLenses();
                console.log(data);
            })
        }
    };
    $scope.deleteLens = function(lensID){
        adminFactory.deleteLens(lensID, function(data){
            console.log(data);
            $scope.checkLenses();
        });
    };
    $scope.clearLensForm = function(){
        $scope.lens = {};
    };
    
});