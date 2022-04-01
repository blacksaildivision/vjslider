vjslider - Vanilla JS Slider
============================
vjslider is:
 - super simple
 - infinite
 - responsive
 - touch friendly
 - no dependencies
 - tiny 2.71kB gzipped
 - written in ES6
 - powered by WebPack
 - tested with Jest and Puppeteer

How to use?
-----------
HTML markup: 
```html
<div class="vjslider">
    <div class="vjslider__slider">
        <div class="vjslider__slide">Slide 1</div>
        <div class="vjslider__slide">Slide 2</div>
        <div class="vjslider__slide">Slide 3</div>
    </div>
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
const options = {};
const slider = new VJSlider(document.querySelector('.vjslider'), options);

// You can manually change slides by using next() and prev() functions:
slider.next();
slider.prev();

// You can destroy slider with
slider.destroy();

// You can reload slider (with alternative options if needed passed as argument to reload method)
slider.reload({numberOfVisibleSlides: 3});
```

Full example in demo directory. 

Options
-------

You can use following options:

`numberOfVisibleSlides` (_default: 1_) - display given number of slides in slider viewport.

Development
-----------
vjslider is build with WebPack. 
WebPack is responsible for building and linting JS files, building CSS from Sass files. If you need pure ES6 version, use script from ./src directory.

Install dependencies, webpack and run local server
```
npm install
npm start
```

Prepare production build
```
npm run build
```

Webpack has local server running after `npm start` command. To see the demo visit [http://localhost:8363/demo](http://localhost:8363/demo)


Run tests (webpack-dev-server must be up and running)
```
npm test
```
