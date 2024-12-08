var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const concat = require('gulp-concat');  // To concatenate Flickity with other JS

// Modify the scripts task to include Flickity
gulp.task('scripts', function() {
    return gulp.src([
            './node_modules/flickity/dist/flickity.pkgd.min.js',
            './js/scripts.js'
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
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./js'));
});

// Styles task: Include Flickity CSS and compile/rename SCSS
gulp.task('styles', function () {
    return gulp.src([
            './node_modules/flickity/dist/flickity.min.css',
            './scss/styles.scss'
        ])
        .pipe(wait(250))
        .pipe(sass({
            includePaths: ['./node_modules']
        }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./css'));
});


gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts'));
    gulp.watch('./scss/styles.scss', gulp.series('styles'));
});
