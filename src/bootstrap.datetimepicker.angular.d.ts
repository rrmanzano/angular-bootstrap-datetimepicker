interface JQuery
{
    datetimepicker(): any;
    datetimepicker(options:any): any;
}

interface IScopeBootstrapDatetimepickerDirective extends ng.IScope
{
    options: string;
}

interface IAttributesBootstrapDatetimepickerDirective extends ng.IAttributes
{
    options: string;
    datetimepickerOptions: string;
    datetimepickerEvents: string;
}