const gulp = require('gulp');
const casperJs = require('gulp-casperjs');

gulp.task('casperjs', () => {
    return gulp.src('test/*.js')
        .pipe(casperJs());
});

gulp.task('default', ['casperjs']);
