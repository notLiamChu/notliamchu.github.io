var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const concat = require('gulp-concat');  // New: To concatenate Flickity with other JS
const path = require('path');

// Modify the scripts task to include Flickity
gulp.task('scripts', function() {
    return gulp.src([
            './node_modules/flickity/dist/flickity.pkgd.min.js', // Include Flickity JS
            './js/scripts.js'  // Your custom JS file
        ])
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel({
          presets: [['@babel/env', {modules:false}]]
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(concat('scripts.min.js'))  // Concatenate Flickity and your scripts
        .pipe(gulp.dest('./js'));
});

// Add a styles task for Flickity CSS if you need it
gulp.task('styles', function () {
    return gulp.src([
            './node_modules/flickity/dist/flickity.min.css', // Include Flickity CSS
            './scss/styles.scss' // Your custom SCSS file
        ])
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts'));
    gulp.watch('./scss/styles.scss', gulp.series('styles'));
});
