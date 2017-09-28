/// <reference path="bootstrap.datetimepicker.angular.d.ts" />
/// <reference path="bootstrap.datetimepicker.angular.eventHandler.ts" />

module AngularBootstrapDatetimepickerPlugin
{
    export class BootstrapDatetimepickerDirective implements ng.IDirective
    {        
        public restrict = 'A';
        public require = '?ngModel';
        public scope = {
            options: '=?datetimepickerOptions'
        };

        constructor(private $timeout: ng.ITimeoutService) {}

        public link: ng.IDirectiveLinkFn = (
            $scope: IScopeBootstrapDatetimepickerDirective,
            element: JQuery,
            $attrs: IAttributesBootstrapDatetimepickerDirective,
            ngModel?: ng.INgModelController) => {

            var options = {} as any;
            if ($scope.options){
                this.parseMethods($attrs.datetimepickerOptions, $scope.options);
                angular.copy($scope.options, options);
            }

            var mapEvents = function(){
              if ($attrs.datetimepickerEvents){
                var events = $scope.$eval($attrs.datetimepickerEvents);
                for (var prop in events) {
                    if (events[prop]) {
                        var event = new AngularBootstrapDatetimepickerPluginUtils.EventHandler($scope);
                        event.propertyName = events[prop];
                        element.on(prop,  event.action);
                    }
                }
              }
            };

            // Change View value
            element.on('dp.change', (e: any) => {
              if (ngModel && e.target.value) {
                this.$timeout(() => {
                  ngModel.$setViewValue(e.target.value);
                });
              }
            }).datetimepicker(options);


            var date = options.defaultDate || null;
            if (date){
                ngModel.$setViewValue(date);
            }

            mapEvents();
        }



        public parseMethods(json:string, obj: any): void{
            const regex = /("?)\b(\w+)\1\s*:\s*("?)((?:\w+[-+*%])*?\w+)\b\3\((.*?)\)/gm;
            let m;
            
            while ((m = regex.exec(json)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                
                // The result can be accessed through the `m`-variable.
                m.filter(x => x && x.indexOf(':') > -1).forEach((match, groupIndex) => {
                    var value = match.split(':');
                    var method = value.filter((e, idx) => idx > 0).join("");
                    obj[value[0]] = new Function("return " + method)();
                });
            }
        }

        static factory(): ng.IDirectiveFactory {
            var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService) => new BootstrapDatetimepickerDirective($timeout); 
            directive.$inject = ["$timeout"];
            return directive;
        }
    }
}

angular
    .module('datetimepicker', [])
    .directive('datetimepicker', AngularBootstrapDatetimepickerPlugin.BootstrapDatetimepickerDirective.factory());