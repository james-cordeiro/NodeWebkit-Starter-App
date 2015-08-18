'use strict';

// Load plugins
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    minifycss       = require('gulp-minify-css'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),
    clean           = require('gulp-clean'),
    concat          = require('gulp-concat'),
    order           = require('gulp-order'),
    cache           = require('gulp-cache'),
    runsequence     = require('run-sequence'),
    ifElse          = require('gulp-if-else'),
    NwBuilder       = require('nw-builder'),
    util            = require('gulp-util'),
    argv            = require('yargs').argv;
    
    
var paths = {
        src: "application/src/",
        dest: "application/dist/"
    };

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.src + 'styles/**/*.scss')
        .pipe(sass({ style: 'expanded' })).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'styles')).on('error', function(err){ console.log(err.message); })
        .pipe(rename({ suffix: '.min' })).on('error', function(err){ console.log(err.message); })
        .pipe(minifycss()).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'styles')).on('error', function(err){ console.log(err.message); });
});

// Fonts CSS
gulp.task('fonts-css', function() {
    return gulp.src(paths.src + 'styles/fonts/**/*.css')
        .pipe(gulp.dest(paths.dest + 'styles/fonts')).on('error', function(err){ console.log(err.message); })
        .pipe(rename({ suffix: '.min' })).on('error', function(err){ console.log(err.message); })
        .pipe(minifycss({mangle: false})).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'styles/fonts')).on('error', function(err){ console.log(err.message); });
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([paths.src + 'styles/fonts/**/*.eot', paths.src + 'styles/fonts/**/*.svg', paths.src + 'styles/fonts/**/*.ttf', paths.src + 'styles/fonts/**/*.woff', paths.src + 'styles/fonts/**/**/*'])
        .pipe(gulp.dest(paths.dest + 'styles/fonts')).on('error', function(err){ console.log(err.message); });
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src([
            paths.src + 'scripts/**/!(app)*.js',
            paths.src + 'scripts/!(app)*.js',
            paths.src + 'scripts/app.js'
        ])
        .pipe(concat('app.js')).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'scripts')).on('error', function(err){ console.log(err.message); })
        .pipe(rename({ suffix: '.min' })).on('error', function(err){ console.log(err.message); })
        .pipe(uglify()).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'scripts')).on('error', function(err){ console.log(err.message); });
});

// Images
gulp.task('images', function() {
    return gulp.src([
            paths.src + 'images/**/*.jpeg', 
            paths.src + 'images/**/*.jpg', 
            paths.src + 'images/**/*.png', 
            paths.src + 'images/**/*.gif'
        ])
        .pipe(imagemin({ optimizationLevel: 12, progressive: true, interlaced: true })).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'images')).on('error', function(err){ console.log(err.message); });
});

// Clean
gulp.task('clean', function() {
    return gulp.src([paths.dest + 'styles', paths.dest + 'scripts', paths.dest + 'images'], {read: false})
        .pipe(clean()).on('error', function(err){ console.log(err.message); });
});

gulp.task('default', function(cb){
    runsequence('clean', ['styles', 'scripts', 'images'], ['fonts','fonts-css'], cb);
});

gulp.task('release', function(){
    var nw = new NwBuilder({
        files: [ './package.json', './application/**/**' ],
        platforms: ['win', 'osx', 'linux32', 'linux64'],
        macIcns: 'icon.icns'
    });

    nw.on('log', function (msg) {
        util.log('nw-builder', msg);
    });

    return nw.build().catch(function (err) {
        util.log('nw-builder', err);
    });
});

gulp.task('new-release-candidate', function(cb){
    runsequence('clean', ['styles', 'scripts', 'images'], ['fonts','fonts-css'], 'release', cb);
});