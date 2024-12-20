# Changelog

### 3.1.3

* Remove obsolete `{headless: new}` from e2e tests.
* Rewrite `[...document.querySelectorAll].forEach` to `document.querySelectorAll.forEach`.
* Migrate to ESLint 9 and fix new linter errors.
* Update all dependencies to the latest versions.

### 3.1.2

* Use the new headless mode in Puppeteer.
* Update all dependencies to the latest versions.

### 3.1.1

* Update all dependencies to the latest versions.

### 3.1.0

* Change old `[].slice.call(document.querySelectorAll)` syntax to modern `[...document.querySelectorAll]`.
* Change `"type"` to `"module"` in package.json.
* Update all dependencies to the latest versions.

### 3.0.0

* HTML structure now should be created in the browser instead in the library code. Refer to the README file for the new
  setup.
* Optimize the slider for smoother animation without lags between the particular slides.
* Enable swipes/mouse gestures by default.
* Handle tabbing for focusable elements in the slider.
* Update all packages to the latest versions.

### 2.0.3

* Replace deprecated `eslint-loader` with the `eslint-webpack-plugin`.
* Update all other packages to the latest versions.

### 2.0.2

* Replace deprecated `optimize-css-assets-webpack-plugin` with `css-minimizer-webpack-plugin`.
* Remove `jest-puppeteer` dev dependency.
* Update all other packages to the latest versions.

### 2.0.1

* Change node-sass to dart-sass

* Update from Webpack 4 to Webpack 5

* Update all other packages to the latest version

### 2.0.0

* Remove additional wrapper from the slider. Previously the structure was:

```HTML

<div class="vjslider">
    <ul class="vjslider__slider">
        <li class="vjslider__slide">slide</li>
    </ul>
</div>
```

now the structure is:

```HTML

<ul class="vjslider">
    <li class="vjslider__slide">slide</li>
</ul>
```

* Change how the position of the slides is calculated. Previously there was one long strip, now position for each slide
  is calcualted separately.

* Reduce number of clones. Previously clones of the `<li>` elements were necessary, now it's possible to skip creating
  clones.

* Convert from `require` to `import`.

* Update all dependencies

* Remove redundant test after rewriting the slider

* Change quotes from `"` to `'`

* Add `.idea` directory to .gitignore file to slim npm package

* Add changelog file to repository 
