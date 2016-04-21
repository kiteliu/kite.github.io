(function(angular) {
  'use strict';
  angular.module('moviecat.services.http', [])

  .service('HttpService', ['$window', function($window) {

    this.jsonp = function(url, params, fn) {
      // 0. 处理回调函数挂载问题(不能覆盖)
      var cbName = 'jsonp_' + (Math.random() * Math.random()).toString().substr(2);
      $window[cbName] = function(data) {
        fn(data);
        $window.document.body.removeChild(scriptElement);
      };

      // 1. 组合最终请求的url地址
      var querystring = '';
      for (var key in params) {
        querystring += key + '=' + params[key] + '&';
      };

      querystring += 'callback=' + cbName;
      url = url + '?' + querystring;

      // 2. 创建一个script标签，并将src设置为url地址
      var scriptElement = $window.document.createElement('script');
      scriptElement.src = url;

      // 3. appendChild(执行)
      $window.document.body.appendChild(scriptElement);
    };

  }]);
})(angular);
