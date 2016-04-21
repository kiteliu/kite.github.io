(function(angular) {
  'use strict';

  // 创建一个模块
  var todoApp = angular.module('TodoApp');

  // 定义一个指令（指令的作用就是在双击这个任务时自动得到焦点）
  todoApp.directive('autoFocus', [function() {
    return {
      link: function(scope, element, attributes) {
        // console.log(element);
        element.on('dblclick', function() {
          angular.element(this).find('input').eq(1)[0].focus();
        });
      }
    }
  }]);

})(angular);
