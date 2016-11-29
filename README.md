vjslider - Vanilla JS Slider
============================
vjslider is:
 - super simple
 - infinite
 - responsive
 - tiny 1.68kB gzipped
 - written in ES6
 - powered by WebPack

How to use?
-----------
HTML markup: 
```html
<div class="carousel">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
</div>
```

Include styles:
```html
<link href="dist/vjslider.css" rel="stylesheet">
```

Include vjslider library:
```html
<script src="/dist/vjslider.js"></script>
```

Run slider:
```js
// Init slider
var options = {};
var slider = new VJSlider(document.querySelector(".carousel"), options);

// You can manually change slides by using next() and prev() functions:
//slider.next();
//slider.prev();

// You can destroy slider with
//slider.destroy();

// You can reload slider (with alternative options if needed passed as argument to reload method)
//slider.reload();
```

Full example in demo directory. 

Options
-------

You can use following options:

`numberOfVisibleSlides` (_default: 1_) - display given number of slides in slider viewport. Value can not be higher than number of children in slider element

Changelog
---------

You can view VJSlider changelog on [GitHub Wiki page](https://github.com/blacksaildivision/vjslider/wiki/Changelog). 

Development
-----------
vjslider is build with WebPack and Gulp. 
WebPack is responsible for building and linting JS files, building CSS from Sass files. If you need pure ES6 version, use script from ./src directory.

Install dependencies, webpack and run local server
```
npm install
npm install -g webpack webpack-dev-server
npm start
```

Prepare production build
```
webpack -p
```

Webpack has local server running after `npm start` command. To see the demo visit [http://localhost:8363/demo](http://localhost:8363/demo)


Run casperjs tests (webpack-dev-server must be up and running)
```
npm test
```
