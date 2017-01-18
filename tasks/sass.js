/**
 * sass.js
 *
 * Copyright 2017
 *
 * @description
 * @author paraofheaven@163.com
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass:build', function () {
  return sass('src/sass/_web_paging.scss', { style: 'compressed', noCache: true })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/sass/_web_paging.scss', ['sass:build']);
});
