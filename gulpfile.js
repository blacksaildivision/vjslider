const gulp = require('gulp');
const esLint = require('gulp-eslint');
const connect = require('gulp-connect');
const casperJs = require('gulp-casperjs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


gulp.task('connect', () => {
    connect.server({
        port: 8363,
        livereload: true
    });
});


gulp.task('styles', () => {
    return gulp.src('src/scss/vjslider.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('casperjs', () => {
    return gulp.src('test/*.js')
        .pipe(casperJs());
});

gulp.task('lint', () => {
    return gulp.src('src/js/vjslider.js')
        .pipe(esLint())
        .pipe(esLint.format())
        .pipe(esLint.failAfterError());
});

gulp.task('test', ['lint', 'casperjs']);

gulp.task('watch', ['connect'], () => {
    gulp.watch('src/js/vjslider.js', []);
});

gulp.task('default', ['watch']);