(function(angular) {
  'use strict';

  // 主模块
  angular.module('moviecat', [
      'ngRoute',
      'moviecat.movie_detail', // 控制加载的顺序
      'moviecat.movie_list',
      // 'moviecat.in_theaters',
      // 'moviecat.coming_soon',
      // 'moviecat.top250',
      'moviecat.directives.auto_active',
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({ redirectTo: '/in_theaters' });
    }])
    .controller('SearchController', [
      '$scope',
      '$route',
      function($scope, $route) {
        $scope.input = '';
        $scope.search = function() {
          $route.updateParams({ category: 'search', q: $scope.input });
        };
      }
    ]);

}(angular));
