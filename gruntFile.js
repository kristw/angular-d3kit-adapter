/* jshint ignore:start */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // Configurable paths
      root: '.',
      src:  'src',
      test: 'test',
      dist: 'dist',
      projectName: 'angular-d3kit-adapter',
      outputName: 'angular-d3kit-adapter'
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['<%= yeoman.dist %>/*']
        }]
      }
    },

    // Copy files
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.dist %>',
          src: ['<%= yeoman.outputName %>.js']
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/<%= yeoman.outputName %>.min.js': [
            '<%= yeoman.dist %>/<%= yeoman.outputName %>.js'
          ]
        },
        options:{
          report: 'min',
          mangle: true,
          compress: true,
          preserveComments: false
        }
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

    shell: {
      options: {
        stderr: false
      },
      publish: {
        command: 'npm publish'
      }
    }

  });

  //---------------------------------------------------
  // Register all tasks
  //---------------------------------------------------

  grunt.registerTask('build', 'Bundle code for release', [
    // Clean output directory
    'clean:dist',
    'copy:dist',
    // - minify the packaged javascript
    'uglify:dist'
  ]);

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
