'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');



// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug'], function () {

  browserSync.init({
    server: "./app"
  });

  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/pug/*.pug', ['pug']);
  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('app/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('pug', function () {
  return gulp.src('app/pug/index.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('app'));
});
