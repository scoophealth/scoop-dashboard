'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		// Watch
		watch: {
			files: ['src/**/*'],
			options: {
				livereload: true
			}
		},
        // Connect
        connect: {
            server: {
                options: {
                    port: 8080,
                    livereload: true,
                    base: 'src',
                    protocol: 'http'
                }
            }
        },
        // Casper
        casper: {
            options: {
                test: true,
                'fail-fast': true
            },
            tests: {
                src: ['test/**/*.js']
            }
        }
	});
	grunt.registerTask('serve', ['connect', 'watch']);
	grunt.registerTask('test', ['connect', 'casper']);
};