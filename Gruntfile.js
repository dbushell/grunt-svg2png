/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

'use strict';

module.exports = function(grunt)
{

    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tests: ['test/**/*.png']
        },

        nodeunit: {
            tests: ['test/*_test.js']
        },

        svg2png: {
            all: {
                files: [
                    { cwd: 'test/svg/', src: ['**/*.svg'], dest: 'test/png/' }
                ]
            }
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('unset_clearline', 'Unset stdout.clearLine for testing', function(){
        process.stdout.clearLine = undefined;
    });

    grunt.registerTask('test', ['clean', 'svg2png', 'nodeunit']);
    grunt.registerTask('test_noterminal', ['unset_clearline', 'test']);
    grunt.registerTask('default', ['jshint', 'test']);

};
