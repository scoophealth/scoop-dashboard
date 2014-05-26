'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build/', '.tmp/'],
        // Traceur
        traceur: {
            build: {
                options: {
                    // No options.
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['scripts/**/*.js', '!scripts/lib/**/*.js'],
                    dest: 'build/'
                }]
            }
        },
        // LESS
        less: {
            build: {
                options: {
                    paths: ['src/styles/imports/'],
                    cleancss: true
                },
                files: {
                    'build/min.css': ['src/styles/*.less']
                }
            }
        },
        // Uglify
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: 'scripts/lib/**/*.js',
                    dest: 'build/'
                }]
            }
        },
        // Imagemin
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['img/**/*.{png,jpg,gif}'],
                    dest: 'build/'
                }]
            }
        },
        // Assemble (for HBS) (https://github.com/assemble/assemble)
        assemble: {
            options: {
                layoutdir: 'src/layouts',
                partials: ['src/partials/**/*.hbs'],
                flatten: true
            },
            pages: {
                options: { layout: 'default.hbs' },
                src: ['src/*.hbs'],
                dest: 'build/'
            }
        },
        // Copy
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['fonts/**/*.{eot,svg,ttf,woff}'],
                    dest: 'build/'
                }]
            }
        },
        // Watch
        watch: {
            styles: {
                files: ['src/styles/**/*.less'],
                tasks: ['styles'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['scripts'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/**/*.hbs'],
                tasks: ['assemble'],
                options: {
                    livereload: true
                }
            },
            img: {
                files: ['src/img/**.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    livereload: true
                }
            }
        },
        // Connect
        connect: {
            server: {
                options: {
                    port: 9000,
                    livereload: true,
                    base: 'build',
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
                src: ['tests/**/*.js']
            }
        }
    });

    grunt.registerTask('scripts', [
        'traceur',
        'uglify'
    ]);

    grunt.registerTask('styles', [
        'less:build'
    ]);

    // Register Task(s)
    grunt.registerTask('build', [
        'clean',
        'scripts',
        'styles',
        'imagemin',
        'assemble',
        'copy'
    ]);

    grunt.registerTask('develop', [
        'build',
        'connect',
        'watch'
    ]);

    grunt.registerTask('test', [
        'connect',
        'casper'
    ]);

    grunt.registerTask('default', [
        'build',
        'test'
    ]);
};
