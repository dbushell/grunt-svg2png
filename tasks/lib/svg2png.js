/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

var fs = require('fs'),
    page = require('webpage').create(),
    files = JSON.parse(phantom.args[0]),
    total = files.length,
    next = 0,

    file, svgdata, frag, img, svg, width, svgWidth, height, svgHeight;

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

    svgWidth = parseFloat(svg.getAttribute('width').replace('px', ''));
    svgHeight = parseFloat(svg.getAttribute('height').replace('px', ''));

    if (file.width && file.width > 0) {
        width = parseFloat(file.width);
        height = parseFloat(svgHeight * width / svgWidth);
   } else {
        width = svgWidth;
        height = svgHeight;
    }

    img = window.document.createElement('img');
    img.src = 'data:image/svg+xml;utf8,' + svgdata;
    img.setAttribute('width', width);
    img.setAttribute('height', height);
    img.style.cssText = 'display: block; width:' + width + '; height:' + height;

    page.viewportSize = {
        width: width,
        height: height
    };


    // page.open('data:image/svg+xml;utf8,' + svgdata, function(status)
    page.open('data:text/html,<!doctype html><title>svg!</title><body style="padding:0;margin:0">' + img.outerHTML + '</body></html>', function(status)
    {
        page.render(file.dest);
        console.log(JSON.stringify({ 'file': file, 'status': status }));
        nextFile();
    });
};

nextFile();
