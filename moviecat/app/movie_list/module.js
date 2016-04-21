(function(angular) {
  'use strict';

  // 定义一个模块
  angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.services.http'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page?', {
      templateUrl: 'movie_list/view.html',
      controller: 'MovieListController'
    });
  }])

  .controller('MovieListController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $route, $routeParams, HttpService) {

      console.log($routeParams);
      var pageSize = 5;

      $scope.page = parseInt($routeParams.page || 1);

      var start = ($scope.page - 1) * 5;

      $scope.title = 'Loading...';
      $scope.movies = [];
      $scope.loading = true;
      $scope.totalCount = 0; // 条数
      $scope.totalPage = 0; // 页数

      // 0 5 10
      // 1 2 3
      HttpService
        .jsonp(
          'http://api.douban.com/v2/movie/' + $routeParams.category,
          { start: start, count: pageSize, q: $routeParams.q },
          function(data) {
            $scope.loading = false;
            $scope.title = data.title;
            $scope.movies = data.subjects;
            $scope.totalCount = data.total;
            $scope.totalPage = Math.ceil(data.total / pageSize);
            $scope.$apply(); // 强制同步数据到界面
          }
        );

      // 暴露一个翻页的行为
      $scope.go = function(page) {
        if (0 < page && page < $scope.totalPage + 1)
          $route.updateParams({ page: page });
      };

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
