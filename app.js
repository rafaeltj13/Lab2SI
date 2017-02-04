angular.module('toDoList', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'toDoListCtrl'
        })

        .state('edit', {
            url: '/edit',
            templateUrl: 'views/edit.html',
            controller: 'toDoListCtrl'
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'views/contact.html'
        });
}]);