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
        exclude: [
          'ammo.js'
          // TODO: remove physijs_worker.js
        ],
        mainFiles: {
          //'ammo.js': ['builds/ammo.js'],
          'threejs': ['build/three.js']
        }
      }
    },
    uglify: {
      mistigri: {
        options: {
          //compress: true,
          mangle: true
        },
        files: {
          'js/mistigri.min.js': ['js/bower.js', 'src/*.js'],
          'js/ammo.min.js': ['js/ammo.js'],
          'js/physijs_worker.min.js': ['js/physijs_worker.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['bower_components/ammo.js/builds/ammo.js'], dest: 'js/ammo.js'},
          {src: ['bower_components/physijs/physijs_worker.js'], dest: 'js/physijs_worker.js'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', [
    'bower_concat',
    'copy',
    'uglify:mistigri'
  ]);

};