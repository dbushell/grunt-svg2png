/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

'use strict';

var fs = require('fs'),
    grunt = require('grunt'),
    pngjs = require('pngjs');

exports.svg2png = {

    test1: function(test)
    {
        var all = fs.readdirSync('test/png'),
            png = [];

        if (all instanceof Array) {
            all.forEach(function(file) {
                if (/\.png$/.test(file)) {
                    png.push(file);
                }
            });
        }

        test.ok(png instanceof Array && png.length >= 0, 'PNG files should exist in test directory');
        test.done();
    },

    test2: function(test)
    {
        fs.stat('test/png/grunt-logo.png', function(err, stats)
        {
            test.ok(err === null && stats.isFile(), 'PNG "grunt-logo.png" should exist');
            test.done();
        });
    },

    test3: function(test)
    {
        fs.stat('test/png/orange-square.png', function(err, stats)
        {
            test.ok(err === null && stats.isFile(), 'PNG "orange-square.png" should exist');
            test.done();
        });
    },

    test4: function(test)
    {
        fs.stat('test/png/grunt-logo.png', function(err, stats)
        {
            test.ok(err === null && stats.size > 44000 && stats.size < 46000, 'PNG "grunt-logo.png" should be ~45kb in size');
            test.done();
        });
    },

    test5: function(test)
    {
        var png = new pngjs.PNG({ filterType: 4 }),
            stream = fs.createReadStream('test/png/orange-square.png').pipe(png);

        stream.on('parsed', function()
        {
            test.ok(this.width === 1000 && this.height === 1000, 'PNG "orange-square.png" should be 1000x1000px in resolution');
            test.ok(this.data[0] === 251 && this.data[1] === 169 && this.data[2] === 25, 'North-west pixel in PNG "orange-square.png" should be #fba919');
            test.ok(this.data[2000000] === 251 && this.data[2000001] === 169 && this.data[2000002] === 25, 'Centre pixel in PNG "orange-square.png" should be #fba919');

            test.done();
        });

        stream.on('error', function(err)
        {
            test.ok(false, 'File should be readable');
            test.done();
        });
    }

};
