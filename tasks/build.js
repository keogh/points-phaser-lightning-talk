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
var imagemin = require('gulp-imagemin');
var gReplace = require('gulp-replace');

program
  .option('-p, --prod', 'enforce production environment')
  .option('-c, --compress', 'produce a zip package')
  .parse(process.argv);

gulp.task('build:all', [
  'build:audio',
  'build:fonts',
  'build:images',
  'build:html',
  'build:slides',
  'build:js',
  'build:css',
  'build:vendors'
]);

gulp.task('build:audio', function () {
  return gulp.src('./assets/audio/**/*')
    .pipe(gulp.dest('./build/assets/audio/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('build:fonts', function () {
  return gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('./build/assets/fonts'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('build:images', function () {
  return gulp.src(['./assets/**/*.jpg', './assets/**/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('./build/assets/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('build:html', function () {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({
      pretty: !program.prod,
      data: {
        name: '',
        debug: !program.prod
      }
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:js', function () {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('build:css', function () {
  return gulp.src('./src/stylesheets/**/*.css')
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:vendors', function () {
  var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

  return gulp.src('./' + bowerConfig['directory'] + '/phaser/build/phaser*')
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('build:slides', function () {
  var slides = [];
  JSON.parse(fs.readFileSync('./src/slides.json', 'utf8')).slides.forEach(function (slide) {
    slides.push('slides/' + slide + '.md');
  });

  var replacement = '//= include ' + JSON.stringify(slides);

  return gulp.src('./src/index.html')
    .pipe(gReplace(/\<\!\-\- replace\:slides \-\-\>/, replacement))
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