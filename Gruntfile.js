/*
 * Generated on 2015-03-07
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

		less: {
			style: {
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: 'dist/assets/css/main.css.map', // where file is generated and located
					sourceMapURL: '/assets/css/main.css.map', // the complete url and filename put in the compiled css file
					sourceMapBasepath: 'dist', // Sets sourcemap base path, defaults to current working directory.
					sourceMapRootpath: '/' // adds this path onto the sourcemap filename and less file paths
				},
				files: {
					"<%= config.dist %>/assets/css/main.css": "src/less/main.less"
				}
			}
		},

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
			less: {
				files: ['<%= config.src %>/less/**/*.less'],
				tasks: ['less']
			},
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

		//wiredep
		wiredep: {

			task: {

				// Point to the files that should be updated when
				// you run `grunt wiredep`
				src: [
					'<%= config.dist %>**/*.html'   // .html support...
				],

				options: {
					// See wiredep's configuration documentation for the options
					// you may pass:

					// https://github.com/taptapship/wiredep#configuration
				}
			}
		},

		useminPrepare: {
			html: '<%= config.dist %>**/*.html'
		},

		usemin: {
			html: '<%= config.dist %>**/*.html'
		},

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-anchors','assemble-contrib-permalinks','assemble-contrib-sitemap','assemble-contrib-toc'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      theme: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'assemble',
		'wiredep',
		'useminPrepare',
		'concat',
		'uglify',
		'cssmin',
		'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
