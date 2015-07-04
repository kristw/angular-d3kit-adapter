/* jshint ignore:start */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks and config automatically
  // Read: https://github.com/firstandthird/load-grunt-config
  require('load-grunt-config')(grunt, {
    postProcess: function(config){
      // Project settings
      config.yeoman = {
        // Configurable paths
        root: '.',
        src:  'src',
        test: 'test',
        dist: 'dist',
        projectName: 'angular-d3kit-adapter',
        outputName: 'angular-d3kit-adapter'
      };
      return config;
    }
  });

  grunt.registerTask('publish', 'Bundle code, bump and publish to npm', function(mode){
    var bumpMode;
    switch(mode){
      case 'major': bumpMode = 'major'; break;
      case 'minor': bumpMode = 'minor'; break;
      default:
      case 'patch': bumpMode = 'patch'; break;
    }
    grunt.task.run([
      'build',
      'bump:' + bumpMode,
      'shell:publish'
    ]);
  });

};
