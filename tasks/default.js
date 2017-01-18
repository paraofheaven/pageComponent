/**
 * default.js
 *
 * Copyright 2017
 *
 * @description
 * @author paraofheaven@163.com
 */

'use strict';

var gulp = require('gulp');

gulp.task('build', ['webpack:build', 'sass:build'], function () {

});

gulp.task('default', ['build']);

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass:build']);
  gulp.watch('src/js/**/*.js', ['webpack:build']);
});
