var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

gulp.task('start', function () {
    livereload.listen();
    nodemon({
        script: 'app.js',
        ext: 'njk'
    }).on('start', function () {
        gulp.src('app.js').pipe(livereload());
    });
});

gulp.task('default', ['start']);