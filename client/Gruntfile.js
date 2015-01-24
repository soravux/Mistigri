module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    bower_concat: {
      all: {
        dest: 'js/bower.js',
        mainFiles: {
          'ammo.js': ['builds/ammo.js'],
          'threejs': ['build/three.js']
        }
      }
    },
    uglify: {
      bower: {
        files: {
          'js/mistigri.min.js': ['js/bower.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('buildbower', [
    'bower_concat',
    'uglify:bower'
  ]);

};