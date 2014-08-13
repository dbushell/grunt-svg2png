/*!
 * grunt-svg2png
 * https://github.com/dbushell/grunt-svg2png
 *
 * Copyright (c) 2013 David Bushell
 * Licensed under The MIT License (MIT)
 */

var sys = require('system'),
    fs = require('fs'),
    page = require('webpage').create(),

    files, next;


var convertFiles = function()
{
    if (next >= files.length) {
        sendMessage({ 'status': 'done' });
        getCommand();
        return;
    }

    // convert file
    var file = files[next++],
        frag = window.document.createElement('div');

    frag.innerHTML = fs.read(file.src) || '';

    var svg = frag.querySelector('svg'),
        width = svg.getAttribute('width'),
        height = svg.getAttribute('height');

    page.viewportSize = {
        width: parseFloat(width),
        height: parseFloat(height)
    };

    // page.open('data:image/svg+xml;utf8,' + svgData, function(stat)
    page.open(file.src, function(stat)
    {
        page.render(file.dest);
        sendMessage({ 'status': 'progress', 'file': file, 'stat': stat });
        convertFiles();
    });
};

var sendMessage = function(msg)
{
    sys.stdout.writeLine(JSON.stringify(msg));
};

var getCommand = function()
{
    var line = sys.stdin.readLine(),
        result = JSON.parse(line.toString());

    // sys.stderr.writeLine('> ' + line);  // log

    switch (result.cmd)
    {
        case 'todo':
            files = result.files;
            next = 0;
            convertFiles();
            break;

        case 'exit':
            phantom.exit(0);
            return;
    }
};

sendMessage({ 'status': 'start' });
getCommand();
