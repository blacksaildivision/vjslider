# Changelog

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

* Change how the position of the slides is calculated. Previously there was one long strip, now position for each slide is calcualted separately. 

* Reduce number of clones. Previously clones of the `<li>` elements were necessary, now it's possible to skip creating clones.

* Convert from `require` to `import`. 

* Update all dependencies

* Remove redundant test after rewriting the slider
