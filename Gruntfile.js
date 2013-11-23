module.exports = function (grunt) {

  var readOptionalJSON = function (filepath) {
      var data = {};
      try {
        data = grunt.file.readJSON(filepath);
      } catch (e) {}
      return data;
    },
    srcHintOptions = readOptionalJSON('src/.jshintrc');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      dist: {
        src: [ "src/jquery.eventsManager.js" ],
        options: srcHintOptions
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/jquery.eventsManager.js'],
        dest: 'versions/jquery.eventsManager.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! jquery.eventsManager.js v<%= pkg.version %> | Date:<%= grunt.template.today("yyyy-mm-dd") %> |' +
          ' License: https://raw.github.com/tcorral/events_manager/master/LICENSE|' +
          ' (c) 2013\n' +
          '//@ sourceMappingURL=jquery.eventsManager.min.map\n' +
          '*/\n',
        preserveComments: "some",
        sourceMap: 'versions/jquery.eventsManager.min.map',
        sourceMappingURL: "jquery.eventsManager.min.map",
        report: "min",
        beautify: {
          ascii_only: true
        },
        compress: {
          hoist_funs: false,
          join_vars: false,
          loops: false,
          unused: false
        },
        mangle: {
          // saves some bytes when gzipped
          except: [ "undefined" ]
        }
      },
      build: {
        src: ['versions/jquery.eventsManager.js'],
        dest: 'versions/jquery.eventsManager.min.js'
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'versions/',
        src: ['jquery.eventsManager.min.js'],
        dest: 'versions/'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'karma', 'concat', 'uglify', 'compress']);
};