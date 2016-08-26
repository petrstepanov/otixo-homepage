// Required

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    cleanCSS = require('gulp-clean-css');;

// Scripts Task

gulp.task('scripts', function() {
    gulp.src(['./bower_components/jquery/dist/jquery.js',
              './bower_components/bootstrap/dist/js/bootstrap.js',
              './bower_components/slideout.js/dist/slideout.js',
              './js/vendor/jquery.fittext.js',
              './js/main.js'
        ])
        .pipe(plumber()) // prevents breaking and has to go first here
        .pipe(concat('otixo-website.js'))
//        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js/'));
});

// LESS Task

gulp.task('styles', function() {
    gulp.src(['./css/less/otixo-website.less',
              './bower_components/css-hamburgers/dist/hamburgers.css'])
        .pipe(plumber()) // prevents breaking
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(concat('otixo-website.css'))
        .pipe(gulp.dest('./css/'));
});

// Cache Task

gulp.task('cache', function() {
    var stamp = (new Date()).getTime().toString();
    gulp.src('./*.html')
        .pipe(replace(/(t=\d{13,})/g, 't=' + stamp)) // http://www.cheatography.com/davechild/cheat-sheets/regular-expressions/ https://regex101.com/#javascript
        .pipe(gulp.dest('./'));
});

// Watch task (primarily for LESS)

gulp.task('watch', function() {
    gulp.watch('./js/main.js', ['scripts', 'cache']);
    gulp.watch('./css/less/*.less', ['styles', 'cache']);
});

// Default task (calls other tasks)

gulp.task('default', ['scripts', 'styles', 'watch', 'cache']);
