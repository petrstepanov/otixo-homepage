// Required

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),

// Scripts Task

gulp.task('scripts', function() {
    gulp.src(['./bower_components/jquery/dist/jquery.js',
              './bower_components/bootstrap/dist/js/bootstrap.js',
              './js/main.js'
        ])
        .pipe(plumber()) // prevents breaking and has to go first here
        .pipe(concat('selimlab.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js/'));
});

// LESS Task

gulp.task('styles', function() {
    gulp.src('./css/sass/otixo-website.sass')
        .pipe(plumber()) // prevents breaking
        .pipe(sass())
        .pipe(gulp.dest('css/'));
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
    gulp.watch('./css/sass/*.sass', ['styles', 'cache']);
});

// Default task (calls other tasks)

gulp.task('default', ['scripts', 'styles', 'watch', 'cache']);
