var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/index', { 
        templateUrl: '/partials/index.html'
    })
    .when('/login', {
        templateUrl: '/partials/login.html',
        controller: 'loginController'
    })
    .when('/register', {
        templateUrl: '/partials/register.html',
        controller: 'loginController'
    })
    .when('/admin', {
        templateUrl: '/partials/admin.html',
        controller: 'adminController'
    })
    .when('/manufacturer/:manufacturer', {
        templateUrl: '/partials/manufacturer.html',
        controller: 'manufacturerController'
    })
    .when('/camerasList/:manufacturer', {
        templateUrl: '/partials/camerasList.html',
        controller: 'camerasListController'
    })
    .when('/lensList/:manufacturer', {
        templateUrl: '/partials/lensList.html',
        controller: 'lensListController'
    })
    .when('/accessoryList/:manufacturer', {
        templateUrl: '/partials/accessory.html',
        controller: 'accessoryController'
    })
    .when('/profile', {
        templateUrl: '/partials/profile.html',
        controller: 'profileController'
    })
    .when('/gearbox', {
        templateUrl: '/partials/gearbox.html',
        controller: 'gearboxController'
    })
    .otherwise({
        redirectTo: '/login'
    })
})