app.controller('profileController', function($scope, $location, sessionFactory, profileFactory){
    $scope.user = {};
    function checkUserSession() {
        sessionFactory.checkSessionUser(function(data){
            console.log(data);
            $scope.user = data.data.user;
        })
    };
    checkUserSession();
});