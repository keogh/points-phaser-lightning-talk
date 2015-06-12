'use strict';

var fs = require('fs');
var browserSync = require('browser-sync');
var program = require('commander');

var gulp = require('gulp');
var buffer = require('gulp-buffer');
var jade = require('gulp-jade');
var ignore = require('gulp-ignore');
var inject = require('gulp-inject');
var include = require('gulp-include');

program
  .option('-p, --prod', 'enforce production environment')
  .option('-c, --compress', 'produce a zip package')
  .parse(process.argv);

gulp.task('build:all', [
  // 'build:audio',
  // 'build:fonts',
  // 'build:images',
  'build:slides',
  // 'build:js',
  // 'build:css',
  'build:vendors'
]);

gulp.task('build:slides', function () {
  var slides = [];
  JSON.parse(fs.readFileSync('./src/slides.json', 'utf8')).slides.forEach(function (slide) {
    slides.push('./src/slides/' + slide + '.md');
  });

  return gulp.src('./src/index.html')
    .pipe(include())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:vendors', function () {
  var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

  var src = [
    './' + bowerConfig['directory'] + '/phaser/build/phaser*',
    './' + bowerConfig['directory'] + '/remark/out/*.js'
  ];

  return gulp.src(src)
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./build/js/'));
});