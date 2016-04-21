(function(angular) {
  'use strict';

  // 定义一个模块
  angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.services.http'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id', {
      templateUrl: 'movie_detail/view.html',
      controller: 'MovieDetailController'
    });
  }])

  .controller('MovieDetailController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $route, $routeParams, HttpService) {

      $scope.movie = {};
      $scope.loading = true;
      $scope.title = 'Loading...';

      HttpService
        .jsonp(
          'http://api.douban.com/v2/movie/subject/' + $routeParams.id, {},
          function(data) {
            $scope.movie = data;
            $scope.loading = false;
            $scope.title = data.title;
            $scope.$apply(); // 强制同步数据到界面
          }
        );


    }
  ]);

})(angular);



// $http
//   .get('/moviecat/app/data.json')
//   .then((response) => {
//     $scope.movies = response.data;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// JSON_CALLBACK实际上是一个占位符，最终在请求之前会换成angular.callbacks._0
// jQuery_Callback_8923822937428374
// $http.jsonp('')
