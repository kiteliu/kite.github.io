(function(angular) {

  angular.module('moviecat.directives.auto_active', [])

  .directive('autoActive', ['$location', function($location) {
    return {
      // 当这个指令作用于某个元素过后触发一次
      link: function(scope, element, attributes) {
        // console.log(attributes.autoActive);
        // var url = $location.url(); // /in_theaters/1
        scope.$location = $location;
        scope.$watch('$location.url()', function(now, old) {
          // /in_theaters
          var aLink = element.children().attr('href').substr(1);
          if (now.startsWith(aLink)) {
            // 干掉兄弟节点上active
            element.parent().children().removeClass(attributes.autoActive);
            // 给当前元素加上active样式
            element.addClass(attributes.autoActive);
          }
        });
      }
    };

  }]);

})(angular);
