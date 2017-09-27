# Angular-bootstrap-datetimepicker directive

A simple wrapper for eonasdan-bootstrap-datetimepicker by @Eonasdan.
This directive allows you to use a datetimepicker on bootstrap-datetimepicker plugin.

## Requirements

- AngularJS
- JQuery
- [bootstrap-datetimepicker](http://github.com/Eonasdan/bootstrap-datetimepicker)

## Oficial bootstrap-datetimepicker page

[bootstrap-datetimepicker](https://github.com/Eonasdan/bootstrap-datetimepicker)

## Examples and Demo

[Demo](http://htmlpreview.github.io/?https://github.com/rrmanzano/angular-bootstrap-datetimepicker/v1Dev/demo/index.html)

### Installation

Because this is just a wrapper for bootstrap-datetimepicker, you need to have it and all of its dependencies installed as a prerequisite.

Add datetimepicker as a dependency to your application:

```JavaScript
angular.module('app', ['datetimepicker']);
```

### Usage

Minimal example

```HTML
<input type="text" class="form-control" ng-model="datetimepickerValue" datetimepicker datetimepicker-options="{viewMode:'days', format:'l'}"/>
```

Set value programmatically

```HTML
<input type="text" class="form-control" ng-model="datetimepickerValueProgrammatically" datetimepicker datetimepicker-options="{viewMode:'days', format:'l'}"/>
```

```JavaScript
$scope.submit = function() { $scope.datetimepickerValueProgrammatically = '09/20/2017'; };
```

Subscribe to an event

```HTML
<input type="text" class="form-control" ng-model="datetimepickerValueEvent" datetimepicker datetimepicker-options="{viewMode:'days', format:'l'}" datetimepicker-events="{'dp.change':'onChangeEvent'}"/>
```

```JavaScript
$scope.onChangeEvent = function(arg) { console.log("onChange event !!!", arg); };
```