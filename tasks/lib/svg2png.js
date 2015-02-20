/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

var fs = require('fs'),
    system = require('system'),
    page = require('webpage').create(),
    files = JSON.parse(system.stdin.read()),
    total = files.length,
    next = 0,

    file, svgdata, frag, svg, width, height;

var nextFile = function()
{
    if (next >= total) {
        phantom.exit(0);
        return;
    }

    file = files[next++];

    svgdata = fs.read(file.src) || '';

    frag = window.document.createElement('div');
    frag.innerHTML = svgdata;

    svg = frag.querySelector('svg');
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');

    page.viewportSize = {
        width: parseFloat(width),
        height: parseFloat(height)
    };

    // page.open('data:image/svg+xml;utf8,' + svgdata, function(status)
    page.open(file.src, function(status)
    {
        page.render(file.dest);
        console.log(JSON.stringify({ 'file': file, 'status': status }));
        nextFile();
    });
};

nextFile();
