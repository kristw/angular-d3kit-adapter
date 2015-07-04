# angular-d3kit-adapter
Convert a chart created using d3Kit into an angular directive in one command!

### Installation

```
npm install angular-d3kit-adapter --save
```

or

```
bower install angular-d3kit-adapter --save
```

### USAGE

```
// tag name is dasherized chartName parameter that is passed to plug()
<custom-chart
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
  // Custom event listeners are available automatically.
  // Don't add () after function name.
  // This is different from default angular listeners
  // For example, for ng-click you have to add ()
  chart-on-custom-event1="listener1"
  chart-on-custom-event2="listener2"
 >
 </custom-chart>
 ```

### Releasing

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

