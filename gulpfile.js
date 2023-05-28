'use strict';

//npm i --save-dev gulp sass gulp-sass gulp-watch gulp-clean gulp-clean-css gulp-file-include browser-sync

var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    fileinclude = require('gulp-file-include');

var path = {
  css: {
    'build': 'css/',
    'dev': 'src/calculator/scss/calculator.scss'
  },
  watch: ['src/calculator/scss/calculator.scss', 'src/calculator/scss/components/*.scss'],
  clean: 'css/calculator.css'
};

//css
gulp.task('css', function (cb) {
  return gulp.src(path.css.dev)
    .pipe( sass().on('error', sass.logError) )
    .pipe(cleanCSS({compatibility: 'ie8', level: {1: {specialComments: 0}}}))
    .pipe(gulp.dest(path.css.build));
});

//clean
gulp.task('clean', function () {
  return gulp.src(path.clean, {read: false})
    .pipe(clean());
});

//watch
gulp.task('watch', function() {
  gulp.watch(path.watch, gulp.series('css'));
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', gulp.series('css', gulp.parallel('serve', 'watch')));
