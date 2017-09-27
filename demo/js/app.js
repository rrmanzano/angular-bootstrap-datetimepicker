var app = angular.module('app', ['datetimepicker']);
app.controller('exampleController', ['$scope',
  function($scope) {

    $scope.onChangeEvent = function(evt) {
      console.log("onChange event !!!", evt.oldDate);
    };

    $scope.submit = function() {
      $scope.datetimepickerValueProgrammatically = '01/20/2017';
    };

    $scope.clear = function() {
      delete $scope.datetimepickerValueClear; // Or $scope.datetimepickerValueClear = null;
    };
  }
]);