app.controller('amazonAPIController', function($scope, $location, amazonAPIFactory){
    console.log("api controller loaded");
    $scope.item = {};
    $scope.imageURL = "";
    $scope.images = [];
    
    function (json){
        var imageURLs = [];
        function checkDublicate(item){
            for(var i = 0; i < imageURLs.length; i++){
                if(item === imageURLs[i]){
                    return true;
                }
            }
            return false;
        }
        function digObject(object){
            for(var key in object){
                if (typeof object[key] === 'object'){
                    var results = imageHunter(object[key]);
                    for (var i = 0; i < results.length; i++){
                        if (!checkDublicate(results[i])){
                            imageURLs.push(results[i]);
                        };
                    };
                } else if (typeof object[key] === 'string'){
                    if (object[key].length > 3 && object[key].split('.').pop() === 'jpg'){
                        if (!checkDublicate(object[key])){
                        imageURLs.push(object[key]);
                        };
                    }
                }
            };
        };
        function digArray(array){
            for(var i = 0; i<array.length; i++){
                if (typeof array[i] === 'object'){
                    var results = imageHunter(array[i]);
                    for (var j = 0; j < results.length; j++){
                        if (!checkDublicate(results[j])){
                            imageURLs.push(results[j]);
                        };
                    };
                } else if (typeof array[i] === 'string'){
                    if (array[i].length > 3 && array[i].split('.').pop() === 'jpg'){
                        if (!checkDublicate(array[i])){
                            imageURLs.push(array[i]);
                        };
                    }
                }
            };
        };
        for(var key in json){
            if(typeof json[key] === 'object' && Array.isArray(json[key]) === false){
                digObject(json[key]);
            } else if(typeof json[key] === 'object' && Array.isArray(json[key]) === true){
                digArray(json[key]);
            } else if(typeof json[key] === 'string'){
                if(json[key].length > 3 && json[key].split('.').pop() === 'jpg'){
                    if(!checkDublicate(json[key])){
                        imageURLs.push(json[key]);
                    };
                }
            }
        };
        return imageURLs;
    };
    
    $scope.checkAmazonItem = function(){
        console.log("CHECK");
        if(!$scope.ASIN || $scope.ASIN === ""){
            return console.log("input product ASIN");
        } else {
            amazonAPIFactory.checkAmazonItem($scope.ASIN, function(data){
                console.log(data);
                $scope.item = data.data.results.Items.Item[0];
                $scope.images = imageHunter(data);
                if($scope.item.LargeImage){
                    $scope.imageURL = $scope.item.LargeImage.URL;
                    console.log($scope.imageURL);
                }
            });
        };
    };
});