app.controller('loginController', function($scope, $location, loginFactory){
    $scope.user = {};
    $scope.errors = [];
    $scope.login = function(){
        $scope.errors = [];
        if(!$scope.user){
            return console.log('empty')
        } else if(!$scope.user.username){
            return $scope.errors.push('username is empty');
        } else if(!$scope.user.password){
            return $scope.errors.push('password is empty');
        } else {
            loginFactory.login($scope.user, function(data){
                $scope.user = {};
                console.log(data);
                if(data.data.success){
                    $location.url('/index');
                }
            })
        }
    };
    $scope.register = function(){
        $scope.errors = [];
        console.log("woot");
        if(!$scope.user){
            return console.log('nada');
        } else if (!$scope.user.username){
            console.log('no username');
            return $scope.errors.push('Username is empty');
        } else if (!$scope.user.email){
            console.log('no email');
            return $scope.errors.push('Email is empty');
        } else if (!$scope.user.password){
            console.log('no password');
            return $scope.errors.push('Password is empty');
        } else if (!$scope.user.confPassword){
            console.log('passwords do not match');
            return $scope.errors.push('passwords do not match');
        } else if ($scope.user.confPassword !== $scope.user.password){
            console.log($scope.user.confPassword);
            console.log($scope.user.password);
            console.log('passwords do not match');
            return $scope.errors.push('Passwords do not match');
        } else {
            loginFactory.register($scope.user, function(data){
                $scope.user = {};
                console.log(data);
                if(data.data.success){
                    $location.url('/login');
                }
            })
        }
    };
});