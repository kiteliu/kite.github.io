(function(angular) {

  // 解决重复的办法：递归
  function getId() {
    return Math.random();
  }

  // 获取主模块
  var todoApp = angular.module('TodoApp');

  // 定义一个主控制器
  todoApp.controller('MainController', [
    '$scope',
    '$location',
    'Storage',
    function($scope, $location, Storage) {

      // ===== 初始化数据成员 =====
      // 输入框
      $scope.input = '';

      // 当前正在编辑的任务ID
      $scope.currentEditingId = 0;

      // 任务列表，相当于一张表 考虑几个字段的问题
      $scope.todos = Storage.get(); // x00001

      // ===== 暴露行为 =====

      // 新增任务
      $scope.add = function() {
      	// 此方法会在用户敲回车时触发
      	// 回车之前用户肯定已经输入了值
      	// 输入的值由NG自动同步到了￥scope.input
      	// 在这里可以直接通过$scope.input获取到用户输入的值
        if (!$scope.input) return;

        // $scope.todos.push({ id: getId(), text: $scope.input, completed: false });
        Storage.add($scope.input); // 添加到todos列表 并且存起来
        $scope.input = '';
      };

      // 删除任务
      $scope.remove = Storage.remove; // 将指定的元素从数组中移除，并保存

      // 获取todos中有没有已经完成的元素
      $scope.hasCompleted = Storage.hasCompleted;

      // 清空所有已经完成的
      $scope.clearCompleted = function() {
        var temp = Storage.clearCompleted();
        $scope.todos = temp;
      };

      $scope.checkedAll = false;
      // 全部完成
      $scope.allCompleted = function() {
        Storage.allCompleted($scope.checkedAll);
      };

      // 双击启用编辑
      $scope.edit = function(current) {
        $scope.currentEditingId = current.id;
      };

      // 回车保存
      $scope.save = function() {
        $scope.currentEditingId = 0;
        Storage.save();
      };

      // 筛选问题
      $scope.filterData = {};

      // 让$location上的成员可以被监视
      $scope.location = $location;

      // $watch只能监视$scope上的成员（不仅仅是属性，方法的返回值也可以）
      $scope.$watch('location.url()', function(now, old) {
        switch (now) {
          case '/completed':
            $scope.filterData = { completed: true };
            break;
          case '/active':
            $scope.filterData = { completed: false };
            break;
          default:
            // 重新点击了ALL
            $scope.filterData = {};
            break;
        }
      });



      // 在页面加载完过后获取当前的锚点值，根据锚点值决定当前filterData的初始值
      // console.log(window.location.hash);
      // var url = $location.url();
      // switch (url) {
      //   case '/completed':
      //     $scope.filterData = { completed: true };
      //     break;
      //   case '/active':
      //     $scope.filterData = { completed: false };
      //     break;
      //     // default:
      //     //   break;
      // }

      // $scope.changeFilter = function(newFilter) {
      //   $scope.filterData = newFilter;
      // }
    }
  ]);
})(angular);
