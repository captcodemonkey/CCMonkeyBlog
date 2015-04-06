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

		'sftp-deploy': {
			build: {
				auth: {
					host: '104.236.91.125',
					port: '22',
					authKey: 'privateKeyCustom'
				},
				cache: 'sftpCache.json',
				src: 'dist',
				dest: '/usr/share/nginx/html/',
				exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db', 'dist/tmp'],
				serverSep: '/',
				concurrency: 4,
				progress: true
			}
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
        files: ['<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml}'],
        tasks: ['build']
      },
			less: {
				files: ['<%= config.src %>/less/**/*.less'],
				tasks: ['less']
			},
			copy: {
				files: ['<%= config.src %>/**/*.{js,png,jpg,jpeg,gif}'],
				tasks: ['build']
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
					'<%= config.src %>/templates/partials/*.hbs'   // .html support...
				],

				options: {
					// See wiredep's configuration documentation for the options
					// you may pass:

					// https://github.com/taptapship/wiredep#configuration
				}
			}
		},

		useminPrepare: {
			hbs: '<%= config.src %>/templates/partials/*.hbs'
		},

		usemin: {
			hbs: '<%= config.src %>/templates/partials/*.hbs'
		},

    assemble: {
			options: {
				flatten: true,
				assets: '<%= config.dist %>/assets',
				layout: '<%= config.src %>/templates/layouts/default.hbs',
				data: '<%= config.src %>/data/*.{json,yml}',
				helpers: ['helper-moment', '<%= config.src %>/templates/helpers/**/*.js'],
				partials: '<%= config.src %>/templates/partials/*.hbs',

				collections: [
					{
						name: 'navMain',
						sortby: 'navOrder',
						sortorder: 'ascending'
					}
				]
			},
			// Generate posts by forcing Handlebars
			// to recognize `.md` files as templates.
			posts: {
				options: {
					plugins: ['assemble-contrib-permalinks'],
					permalinks: {
						structure: ':year/:month/:basename/index.html'
					},
					layout: '<%= config.src %>/templates/layouts/page.hbs'
				},
				files: [{
					cwd: './src/content/blog/',
					dest: './dist/blog/',
					expand: true,
					src: ['**/*.hbs']
				}]
			},
			home: {
				options: {
					plugins: ['assemble-contrib-permalinks'],
					permalinks: {
						structure: ':basename/index.html'
					},
					layout: '<%= config.src %>/templates/layouts/default.hbs'
				},
				files: [{
					cwd: './src/content/_pages/',
					dest: './dist/',
					expand: true,
					src: ['index.hbs']
				}]
			},
			pages: {
				options: {
					collections: [{
						name: 'pages',
						sortby: 'posted',
						sortorder: 'descending'
					}],
					plugins: ['assemble-contrib-permalinks'],
					permalinks: {
						structure: ':basename/index.html'
					},
					layout: '<%= config.src %>/templates/layouts/page.hbs'
				},
				files: [{
					cwd: './src/content/_pages/',
					dest: './dist/',
					expand: true,
					src: ['**/*.hbs', '!index.hbs']
				}]
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
      },
			partials: {
				expand: true,
				cwd: '<%= config.src %>/templates/partials_src/',
				src: '**',
				dest: '<%= config.src %>/templates/partials/'
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
		'copy:partials',
		'wiredep',
		'less',
		'useminPrepare',
		'concat',
		'usemin',
    'copy:bootstrap',
		'copy:theme',
    'assemble'

  ]);

  grunt.registerTask('default', [
    'build'
  ]);

	grunt.registerTask('deploy', [
	'sftp-deploy'
	]);

};
