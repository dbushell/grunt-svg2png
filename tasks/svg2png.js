/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

'use strict';

var phantomjs = require('phantomjs'),
    path = require('path');

module.exports = function(grunt)
{
    grunt.registerMultiTask('svg2png', 'Rasterize SVG to PNG images using PhantomJS', function()
    {

        var done = this.async(),
            start = new Date(),
            completed = 0,
            files = [],
            total = 0;

        this.files.forEach(function(fset)
        {
            fset.src.forEach(function(svg)
            {
                var src = path.resolve((fset.cwd || "") + svg),
                    dest;

                if (fset.dest) {
                    dest = path.resolve(fset.dest) + '/' + svg;
                } else {
                    dest = src;
                }

                files.push({
                    src: src,
                    dest: dest.replace(/\.svg$/i, '.png')
                });
            });

            total = files.length;
        });

        if (!total) {
            grunt.log.subhead('No files to rasterize');
            done();
            return;
        }

        grunt.log.subhead('Rasterizing SVG to PNG (' + files.length + ' files)...');

        var styles = {

            'bold'          : ['\x1B[1m',  '\x1B[22m'],
            'italic'        : ['\x1B[3m',  '\x1B[23m'],
            'underline'     : ['\x1B[4m',  '\x1B[24m'],
            'inverse'       : ['\x1B[7m',  '\x1B[27m'],
            'strikethrough' : ['\x1B[9m',  '\x1B[29m'],

            'white' : ['\x1B[37m', '\x1B[39m'],
            'grey'  : ['\x1B[90m', '\x1B[39m'],
            'black' : ['\x1B[30m', '\x1B[39m'],

            'blue'    : ['\x1B[34m', '\x1B[39m'],
            'cyan'    : ['\x1B[36m', '\x1B[39m'],
            'green'   : ['\x1B[32m', '\x1B[39m'],
            'magenta' : ['\x1B[35m', '\x1B[39m'],
            'red'     : ['\x1B[31m', '\x1B[39m'],
            'yellow'  : ['\x1B[33m', '\x1B[39m']

        };

        var style = function(str, format)
        {
            return styles[format][0] + str + styles[format][1];
        };

        var update = function()
        {
            var hasTerminal = !!process.stdout.clearLine;

            if (hasTerminal) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
            }

            var str = style('0%', 'yellow') + ' [ ',
                arr = [],
                count = total,
                percent = ((100 / total) * completed).toFixed(2);

            while(count--) {
                arr.push(count < completed ? '=' : ' ');
            }
            str += arr.reverse().join('');
            str += ' ] ' + style(percent + "%", 'green') + ' (' + ((new Date() - start) / 1000).toFixed(1) + 's) ';

            process.stdout.write(str + (hasTerminal ? '' : "\n"));
        };

        var spawn = require('child_process').spawn(
            phantomjs.path,
            [ path.resolve(__dirname, 'lib/svg2png.js') ]
        );
        spawn.stdin.write(JSON.stringify(files));
        spawn.stdin.end();

        spawn.stdout.on('data', function(buffer)
        {
            try {
                var result = JSON.parse(buffer.toString());
                if (result.status) {
                    completed++;
                    update();
                }
            } catch (e) { }
        });

        spawn.on('exit', function()
        {
            update();
            grunt.log.write("\n");
            grunt.log.ok("Rasterization complete.");
            done();
        });

        update();
    });
};
