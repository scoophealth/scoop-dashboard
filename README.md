Yaoft is simply *Yet Another Opinionated Frontend Template*. Nothing more. It doesn't give you magic ponies, it doesn't wash your laundry, and doesn't try inject all sorts of crazy tooling, package managers, or generators into your workflow.

Yaoft is just a collection of files. It's a starting point for your project, if you want. Yaoft assumes you have some idea of the tools it uses, because you're meant to make it yours.

Lets take a look at what's in the box.

### A Sane File Structure ###

Things get confusing with all these weird `asset/` folders and funky naming conventions.

Yaoft is just a few top level files:

* `src/`: The source files of your site. *This is where you'll spend most of your (valuable) time.*
* `tests/`: A folder containing your tests. *You should add a test for most/all functionality!*
* `build/`: A folder containing your prepared site. *You get to copy this to your server, or whatever.*
* `Gruntfile.js`: Where you can configure Grunt. *You get to fiddle with this once in a blue moon.*
* `README.md`: You're already reading me!


### An Alright Grunt Set-up ###

[Grunt](http://gruntjs.com/) is a pretty popular task runner thing. Basically you give it a bunch of premade tasks and figure out how to configure them so you get a "stream" of tasks.

I'm pretty sure [Gulp](http://gulpjs.com/) is superior. So you might want to use that in your project instead. Why not contribute how back? (Only if it's better, of course.)

Take a look at the good old `Gruntfile.js` file and check the bottom. You'll see a number of tasks preconfigured and well commented about what they do.

**Common tasks:**

* `grunt develop`: A continous build of your project. *Use this whenever you're editing or previewing the site.*
* `grunt build`: A one-shot build of your project. *Plan to use this for when you need to deploy the site.*
* `grunt test`: For when you start unit testing, which you should, slacker!

### LESS & Bootstrap Baked In ###

Included in the `src/styles/` folder is the well known [Bootstrap](http://getbootstrap.com/) framework. You'll see that `src/styles/bootstrap.less` imports lots of files from the `src/styles/imports/` folder. It's not magic at all.

Want to customize? Look at `src/styles/imports/{variables,theme}.less`. When you go to update Bootstrap, those will be the only files you need to worry about `diff`ing (Not comfortable with `diff`? Try `vimdiff`).

Add your own stylesheets, just create any file matching `src/styles/*.less` and it'll be compiled down with Bootstrap into a nice `build/min.css` file.

### A JQuery and D3.js Topping ###
Yup, it includes [JQuery](https://jquery.com/), and [D3js](http://d3js.org/). They're in `src/scripts/lib` and get automagically minified in with all the other scripts. Don't want them? Remove them.

### ES6 Sugar Available ###
Yaoft is really forward looking. ES6 is totally awesome. The [Traceur Compiler](https://github.com/google/traceur-compiler) is included out of the box, and will compile and minify any files that match `src/scripts/**/*.es6.js` into the `build/min.js` file.

This means you get things like classes, list comprehensions, etc. Check out the [Traceur docs](https://github.com/google/traceur-compiler/wiki/LanguageFeatures) and ES6 specs!

### Handlebars Templates via Assemble ###
Templates by way of Assemble allows for easier building of pages. You can add layouts to `src/layouts` and set in the `Gruntfile.js` which pages should build with the new layout. By default, they'll use `default.hbs`.

Partials are friendly too. Just stick a partial in the `src/partials` folder and you can use it!

### Watch System with LiveReload ###
When you're running `grunt develop` and have a web browser with the LiveReload addon, activate it and you'll see changes happen as you save. Awesome.

### Automatic Image Optimization ###
Any image in `src/img/` will get auto-optimized for the web. No finnicking with formats.

### Unit Testing with Ghosts ###
[Casper](http://casperjs.org/) is set up to run all the tests in the `tests/` folder.
