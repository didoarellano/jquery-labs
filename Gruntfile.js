'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            js: 'app/assets/js',
            css: 'app/assets/css',
            hbs: '<%= dirs.js %>/templates',
            sass: '<%= dirs.css %>/scss'
        },

        mainScss: '<%= dirs.sass %>/main.scss',

        emberTemplates: {
            options: {
                templateBasePath: '<%= dirs.hbs %>/'
            },
            compile: {
                files: {
                    '<%= dirs.js %>/templates.js': '<%= dirs.hbs %>/**/*.hbs'
                },
            }
        },

        sass: {
            options: {
                sourcemap: true,
                style: 'expanded'
            },
            dev: {
                files: {
                    '<%= dirs.css %>/styles.css': '<%= mainScss %>'
                }
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= dirs.css %>/styles.min.css': '<%= mainScss %>'
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    base: 'app'
                }
            }
        },

        watch: {
            sass: {
                files: ['<%= dirs.sass %>/**/*.scss'],
                tasks: ['sass:dev']
            },
            hbs: {
                files: ['<%= dirs.hbs %>/**/*.hbs'],
                tasks: ['emberTemplates:compile']
            }
        }

    });

    grunt.registerTask('default', [
        'sass:dev',
        'emberTemplates:compile',
        'connect',
        'watch'
    ]);

};
