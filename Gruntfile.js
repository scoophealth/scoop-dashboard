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
                    protocol: 'http',
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
					}
                },
				proxies: [{
					context: '/api/v1',
					host: 'localhost',
					port: 8081,
					https: false,
					changeOrigin: true,
					headers: {
						'is-mock': true
					}
				}]
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
        },
		// Stubby
		stubby: {
			stubServer: {
				options: {
					stubs: 8081
				},
				files: [{
					src: [ 'mocks/*.{json,yaml,js}' ]
				}]
			}
		}
	});
	grunt.registerTask('serve', ['stubby', 'configureProxies:server', 'connect', 'watch']);
	grunt.registerTask('test', ['stubby', 'configureProxies:server', 'connect', 'casper']);
};