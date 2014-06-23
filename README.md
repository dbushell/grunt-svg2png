grunt-svg2png
=============

Grunt plugin to rasterize SVG to PNG images using PhantomJS

## Getting Started

This plugin requires [Grunt](http://gruntjs.com/) `~0.4.1`

````javascript
// Gruntfile.js configuration
grunt.loadNpmTasks('grunt-svg2png');

grunt.initConfig({
    svg2png: {
        all: {
            // specify files in array format with multiple src-dest mapping
            files: [
                // rasterize all SVG files in "img" and its subdirectories to "img/png"
                { cwd: 'img/', src: ['**/*.svg'], dest: 'img/png/' }
            ]
        }
    }
});
````

This task works well between [SVGO Grunt](https://github.com/svg/svgo-grunt) and [Grunt ImageOptim](https://github.com/JamieMason/grunt-imageoptim)!

## Updates

**2014-06-23** pulled in [path fix](https://github.com/dbushell/grunt-svg2png/pull/9) and option for [use case without terminal](https://github.com/dbushell/grunt-svg2png/pull/13). You may need to update your `files` config to include `cwd` and `dest` options.

* * *

Created by [David Bushell](http://dbushell.com) | [@dbushell](http://twitter.com/dbushell)

Copyright © 2013 David Bushell | MIT license
