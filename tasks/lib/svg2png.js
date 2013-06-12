/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

var fs = require('fs');

var inputFile = phantom.args[0],
    outputFile = phantom.args[1],

    svgdata = fs.read(inputFile) || '',

    frag = window.document.createElement('div'),

    page = require('webpage').create();

frag.innerHTML = svgdata;

var svg = frag.querySelector('svg'),
    width = svg.getAttribute('width'),
    height = svg.getAttribute('height');

page.viewportSize = {
    width: parseFloat(width),
    height: parseFloat(height)
};

// page.open(inputFile, function(status)
page.open('data:image/svg+xml;utf8,' + svgdata, function(status)
{
    page.render(outputFile);
    phantom.exit(false);
    process.exit(0);
});
