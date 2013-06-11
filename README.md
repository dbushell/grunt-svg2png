grunt-svg2png
=============

Grunt plugin to rasterize SVG to PNG images using PhantomJS

This plugin requires (Grunt ~0.4.1)[http://gruntjs.com/]

## Example Usage

````javascript
// Gruntfile.js configuration

grunt.loadNpmTasks('grunt-svg2png');

grunt.initConfig({

    svg2png: {
        all: {
            // specify files in array format with multiple src-dest mapping
            files: [
                // rasterize all SVG files in "img" and its subdirectories to "img/png"
                { src: ['img/**/*.svg'], dest: 'img/png/' },
                // rasterize SVG file to same directory
                { src: ['img/logo.svg'] },
            ]
        }
    }

});
````

* * *

## Authors

* David Bushell [http://dbushell.com][David Bushell] [@dbushell][David Bushell on Twitter]

Copyright © 2013 David Bushell | MIT license
