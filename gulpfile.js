const gulp = require('gulp');
const babel = require('gulp-babel');
const esLint = require('gulp-eslint');
const uglify = require('gulp-uglify');

gulp.task('scripts', () => {
    return gulp.src('src/js/vjslider.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
    return gulp.src('src/js/vjslider.js')
        .pipe(esLint())
        .pipe(esLint.format())
        .pipe(esLint.failAfterError());
});

gulp.task('test', ['lint']);

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/js/vjslider.js', ['scripts']);
});

gulp.task('default', ['watch']);