const gulp = require('gulp');
const babel = require('gulp-babel');
const esLint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');


gulp.task('connect', () => {
    connect.server({
        port: 8363,
        livereload: true
    });
});


gulp.task('scripts', () => {
    return gulp.src('src/js/vjslider.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('lint', () => {
    return gulp.src('src/js/vjslider.js')
        .pipe(esLint())
        .pipe(esLint.format())
        .pipe(esLint.failAfterError());
});

gulp.task('test', ['lint']);

gulp.task('watch', ['connect', 'scripts'], () => {
    gulp.watch('src/js/vjslider.js', ['scripts']);
});

gulp.task('default', ['watch']);