/**
 * angular-bootstrap-datetimepicker - v0.1
 * A simple wrapper for eonasdan-bootstrap-datetimepicker by @Eonasdan. This directive allows you to use a datetimepicker on bootstrap-datetimepicker plugin.
 * https://github.com/rrmanzano/angular-bootstrap-datetimepicker
 * License: MIT http://opensource.org/licenses/MIT
 **/
var AngularBootstrapDatetimepickerPluginUtils;
(function (AngularBootstrapDatetimepickerPluginUtils) {
    var EventHandler =  (function () {
        function EventHandler($scope) {
            var _this = this;
            this.foo = function (args) { };
            this.action = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                var fn = _this.$scope.$parent.$eval(_this.propertyName);
                if (!fn) {
                    return;
                }
                if (!_this.$scope.$root.$$phase) {
                    _this.$scope.$parent.$apply(function () {
                        fn.apply(_this.$scope.$parent, items);
                    });
                }
                else {
                    fn.apply(_this.$scope.$parent, items);
                }
            };
            this.$scope = $scope;
        }
        return EventHandler;
    }());
    AngularBootstrapDatetimepickerPluginUtils.EventHandler = EventHandler;
})(AngularBootstrapDatetimepickerPluginUtils || (AngularBootstrapDatetimepickerPluginUtils = {}));
var AngularBootstrapDatetimepickerPlugin;
(function (AngularBootstrapDatetimepickerPlugin) {
    var BootstrapDatetimepickerDirective =  (function () {
        function BootstrapDatetimepickerDirective($timeout) {
            var _this = this;
            this.$timeout = $timeout;
            this.restrict = 'A';
            this.require = '?ngModel';
            this.scope = {
                options: '=?datetimepickerOptions'
            };
            this.link = function ($scope, element, $attrs, ngModel) {
                var options = {};
                if ($scope.options) {
                    _this.parseMethods($attrs.datetimepickerOptions, $scope.options);
                    angular.copy($scope.options, options);
                }
                var mapEvents = function () {
                    if ($attrs.datetimepickerEvents) {
                        var events = $scope.$eval($attrs.datetimepickerEvents);
                        for (var prop in events) {
                            if (events[prop]) {
                                var event = new AngularBootstrapDatetimepickerPluginUtils.EventHandler($scope);
                                event.propertyName = events[prop];
                                element.on(prop, event.action);
                            }
                        }
                    }
                };
                element.on('dp.change', function (e) {
                    if (ngModel && e.target.value) {
                        _this.$timeout(function () {
                            ngModel.$setViewValue(e.target.value);
                        });
                    }
                }).datetimepicker(options);
                var date = options.defaultDate || null;
                if (date) {
                    ngModel.$setViewValue(date);
                }
                mapEvents();
            };
        }
        BootstrapDatetimepickerDirective.prototype.parseMethods = function (json, obj) {
            var regex = /("?)\b(\w+)\1\s*:\s*("?)((?:\w+[-+*%])*?\w+)\b\3\((.*?)\)/gm;
            var m;
            while ((m = regex.exec(json)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                m.filter(function (x) { return x && x.indexOf(':') > -1; }).forEach(function (match, groupIndex) {
                    var value = match.split(':');
                    obj[value[0]] = new Function("return " + value[1])();
                });
            }
        };
        BootstrapDatetimepickerDirective.factory = function () {
            var directive = function ($timeout) { return new BootstrapDatetimepickerDirective($timeout); };
            directive.$inject = ["$timeout"];
            return directive;
        };
        return BootstrapDatetimepickerDirective;
    }());
    AngularBootstrapDatetimepickerPlugin.BootstrapDatetimepickerDirective = BootstrapDatetimepickerDirective;
})(AngularBootstrapDatetimepickerPlugin || (AngularBootstrapDatetimepickerPlugin = {}));
angular
    .module('datetimepicker', [])
    .directive('datetimepicker', AngularBootstrapDatetimepickerPlugin.BootstrapDatetimepickerDirective.factory());
