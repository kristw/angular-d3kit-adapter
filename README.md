# angular-d3kit-adapter
Convert a chart created using [d3Kit](https://github.com/twitter/d3kit) into an AngularJS directive in one command!

See [demo](http://bl.ocks.org/kristw/71d73ecee8c7be61a8a7)

### Installation

```
npm install angular-d3kit-adapter --save
```

or

```
bower install angular-d3kit-adapter --save
```

This module supports AMD, CommonJS and browser globals out of the box.

### Usage
First, use the adapter to plug a chart to angular module.

```
// .plug(angularModule, chartName, chartConstructorFunction)
```

Globals

```
<script src="angular-d3kit-adapter.min.js"></script>
<script>
// global
var module = angular.module('something',[]);
angular.d3KitAdapter.plug(module, 'bubbleChart', BubbleChart);
</script>
```

AMD

```
define(['angular', 'angular-d3kit-adapter'], function(angular, d3KitAdapter){
  var module = angular.module('something',[]);
  d3KitAdapter.plug(module, 'bubbleChart', BubbleChart);
));
```

CommonJS

```
var d3KitAdapter = require('angular-d3kit-adapter');

var module = angular.module('something',[]);
d3KitAdapter.plug(module, 'bubbleChart', BubbleChart);
```

Then use the directive as you wish. Tag name is dasherized ```chartName``` parameter that was passed to ```plug()```

```
<bubble-chart
  // $scope.data
  chart-data="data"
  // $scope.options
  chart-options="options"
  // string (optional)
  chart-auto-resize="both"
  // string (optional)
  chart-auto-resize-detection="dom"
  // This will be called after the chart is created, passing the chart as argument
  chart-on-init="handleInit"
  // If this chart has any custom event (defined in d3Kit style)
  // Custom event listeners are available automatically as attributes.
  // However, DON'T add () after function name.
  // This is different from default angular listeners
  // For example, for ng-click you have to add ()
  chart-on-custom-event1="listener1"
  chart-on-custom-event2="listener2"
 >
</bubble-chart>
```

This tag, once compiled, will become a div that has class "bubble-chart" (dasherized ```chartName```), so you can use ```.bubble-chart``` in css for styling.

### Development

To build, bump and publish
```
grunt publish
```

#### For debugging

Build minified version
```
grunt build
```
Dry run bump version
```
grunt bump --dry-run
```

