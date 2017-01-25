app.controller('bagsListController', function($scope, $location, $routeParams, adminFactory){
    $scope.manufacturer = {};
    $scope.bags = [];
    $scope.bagPic = "";
    $scope.bagErrors = [];
    $scope.bag = {};
    $scope.checkBags = function(){
        console.log($scope.manufacturer);
        adminFactory.checkBags($scope.manufacturer._id, function(data){
            console.log(data);
            if(data.data.success){
                $scope.bags = data.data.bags;
                console.log($scope.bags);
            }
        });
    };
    $scope.targetUpdateID = "";
    
    $scope.checkManufacturer = function(){
        adminFactory.checkManufacturer($routeParams.manufacturer, function(data){
            console.log(data);
            if(data.data.success){
                $scope.manufacturer = data.data.manufacturer;
                $scope.bag.fk_manufacturer = $scope.manufacturer._id;
                $scope.checkBags();
            } else {
                console.log("what happened?");
            }
        })
    };
    
    $scope.checkManufacturer();
    
    $scope.updateBagPic = function(){
        console.log("update bag pic");
        if(!$scope.bag.gearboxPic){
            return console.log("add a bag pic url");
        } else {
            console.log("pong");
//            $scope.bagPic = $scope.bag.gearboxPic;
        };
    };
    
    $scope.addBag = function(bagID){
        if(bagID){
            console.log(bagID);
            $scope.bag._id = bagID;
        }
        console.log($routeParams);
        $scope.bagErrors = [];
        if(!$scope.bag){
            $scope.bagErrors.push("where's your bag?");
        };
        if(!$scope.bag.name || $scope.bag.name === "" || $scope.bag.name.length < 3){
            $scope.bagErrors.push("add a bag name");
        };
        if(!$scope.bag.model){
            $scope.bagErrors.push("add a bag model");
        };
        if(!$scope.bag.weightCap){
            $scope.bagErrors.push("please add weight capacity");
        };
        if($scope.bagErrors.length > 0){
            return console.log("fix your errors");
        } else {
            adminFactory.addBag($scope.bag, function(data){
                console.log(data);
                $scope.bag = {};
                $scope.checkBags();
            });
        };
    };
    
    $scope.editBag = function(bag){
        $scope.targetUpdateID = bag._id;
        $scope.bag = bag;
    };
    
    $scope.deleteBag = function(bagID, callback){
        console.log(bagID);
        adminFactory.deleteBag(bagID, function(data){
            if(callback){
                callback(data);
            }
            $scope.checkBags();
        })
    };
    
    $scope.updateBag = function(){
        $scope.deleteBag($scope.bag._id, function(data){
            console.log(data);
            if(data.data.success){
                $scope.addBag($scope.targetUpdateID);
            }
        })
    };
});