'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var webpack = require('gulp-webpack')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()

gulp.task('css', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
})

gulp.task('js', () => {
  return gulp
    .src('./mocha-extjs.js')
    .pipe(webpack({
      resolveLoader: {
        root: './'
      },
      module: {
        loaders: [{
          loader: 'babel-loader'
        }]
      },
      output: {
        filename: 'mocha-extjs.js'
      }
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['css', 'js'], () => {
  browserSync.init({
    server: {
      baseDir: ['./test/sandbox', './']
    }
  })

  gulp.watch(['./mocha-extjs.js', './src/**/*', './test/**/*'], ['js'])
  gulp.watch('./scss/*.scss', ['css'])
  gulp.watch(['./dist/*'], browserSync.reload)
})
