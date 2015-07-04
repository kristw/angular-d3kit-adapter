// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['angular'], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // EDIT: Pass dependencies to factory function
    module.exports = factory(require('angular'));
  }
  else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    root.angular.d3KitAdapter = factory(root.angular);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (angular) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

  function dasherize(str) {
    return str.trim().replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  var adapter = (function(){

    function plug(ngModule, chartName, chartFn){
      var listenerNames = chartFn.getCustomEvents().map(function(eventName){
        return 'chartOn'+capitalize(eventName);
      });

      var scope = {
        chartData: '=',
        chartOptions: '=',
        chartOnInit: '&'
      };
      listenerNames.forEach(function(name){
        scope[name] = '&';
      });

      return ngModule.directive(chartName, ['$parse', function ($parse){
        return {
          restrict: 'AE',
          replace: true,
          template: '<div></div>',
          scope: scope,
          link: function(scope, element, attrs) {
            angular.element(element[0]).addClass(dasherize(chartName));

            var chart = new chartFn(element[0]);
            scope.chart = chart;

            if(attrs.width && attrs.height){
              chart.dimension([attrs.width, attrs.height]);
            }
            else if(attrs.width){
              chart.width(attrs.width);
            }
            else if(attrs.height){
              chart.height(attrs.height);
            }
            else{
              chart.width('auto');
            }

            // if auto-resize is set in the attributes
            // can be 'false', 'true' ('width'), 'width', 'height' or 'both'
            // otherwise, use default ('width')
            chart.autoResize(attrs.chartAutoResize || 'width');

            // how to detect resize
            // 'window' or 'dom'
            // default to window
            chart.autoResizeDetection(attrs.chartAutoResizeDetection || 'window');

            // watch chartData and wrap it with $q.when()
            // to support both raw data and promise
            scope.$watch('chartData', function(chartData){
              // data is a promise
              if(chartData && angular.isFunction(chartData.then)){
                chartData.then(function(data){
                  chart.data(data);
                });
              }
              else{
                chart.data(chartData);
              }
            });

            // watch for options change
            scope.$watch('chartOptions', function(chartOptions){
              if(chartOptions){
                chart.options(chartOptions);
              }
            }, true);

            // handle init listener
            if(angular.isFunction(scope.chartOnInit())){
              scope.chartOnInit()(chart);
            }

            // connect event listener pass from html for each custom events
            listenerNames.forEach(function(name){
              chart.on(eventName+'.chartDirectiveFactory', function(){
                var self = this;
                var listener = scope[name]();
                if(angular.isFunction(listener)){
                  var args = Array.prototype.slice.call(arguments);
                  listener.apply(self, args);
                }
              });
            });

            // clear event handlers when destroyed
            scope.$on('$destroy', function(){
              // disable auto-resize
              chart.autoResize(false);
              // clear other event handlers
              chart.on('.chartDirectiveFactory', null);
            });
          }
        };
      }]);
    }

    return {
      plug: plug
    };
  }());

  // return module
  return adapter;

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));