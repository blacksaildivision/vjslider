const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', function () {
    return gulp.src('src/js/vjslider.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

