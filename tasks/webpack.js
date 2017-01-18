/**
 * webpack.js
 *
 * Copyright 2017
 *
 * @description
 * @author paraofheaven@163.com
 */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

// Config
var webpackConfig = require('../webpack.config');

var compiler = webpack(webpackConfig);

gulp.task('webpack:build', function () {
  compiler.run(function (err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
  });
});

gulp.task('webpack:watch', function () {
  compiler.watch(200, function (err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
  });
});
