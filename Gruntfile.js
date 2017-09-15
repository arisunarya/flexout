module.exports = function(grunt){ 
	"use strict";

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					outputStyle: "expanded"
				},
				files: {
					'dist/flexout.css': 'flexout.scss'
				}
			},
			docs: {
				options: {
					outputStyle: "expanded",
					sourceMap: true
				},
				files: {
					'docs/css/docs.css': 'docs/scss/docs.scss'
				}
			}
		},
		
		autoprefixer: {
			options: {
				browsers: [
					"Explorer >= 11",
					"Edge >= 14",
					"Firefox >= 52",
					"Chrome >= 49",
					"Opera >= 12",
					"Safari >= 10",
					"Android >= 4.4",
					"iOS >= 6"
					// "iOS >= 9.3"
				]
			},
			dist: {
				src: "dist/flexout.css"
			},
			docs: {
				options: {
					map: true,
				},
				src: "docs/css/docs.css"
			}
		},

		cssmin: {
			dist: {
				files: {
					"dist/flexout.min.css": "dist/flexout.css"
				}
			},
			docs: {
				options: {
					sourceMap: true
				},
				files: {
					// "docs/css/docs.css": "docs/css/docs.css"
				}
			}
		},
		
		connect: {
			server: {
				options: {
					hostname: "localhost",
					port: 9000,
					livereload: 9090,
					open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/docs',
				}
			}
		},

		watch: {
			output: {
				options: {
					livereload: 9090
				},
				files: [
					"dist/flexout.css",
					"dist/flexout.min.css",
					"docs/css/docs.css",
					"docs/index.html"
				],
			},
			dist: {
				files: "flexout.scss",
				tasks: ["sass", "autoprefixer", "cssmin"]
			},
			docs: {
				files: "docs/scss/*.scss",
				tasks: ["sass:docs", "autoprefixer:docs"]
			}
		}
	});
	
	grunt.registerTask("default", function(){
		grunt.task.run(["sass","autoprefixer", "cssmin"]);
	});

	grunt.registerTask("serve", function(){
		grunt.task.run(["connect","watch"]);
	});
	
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-sass");
};
