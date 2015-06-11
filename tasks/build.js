'use strict';

var fs = require('fs');
var browserSync = require('browser-sync');
var program = require('commander');

var gulp = require('gulp');
var jade = require('gulp-jade');

program
  .option('-p, --prod', 'enforce production environment')
  .option('-c, --compress', 'produce a zip package')
  .parse(process.argv);

gulp.task('build:all', [
  // 'build:audio',
  // 'build:fonts',
  // 'build:images',
  'build:html'
  // 'build:js',
  // 'build:css',
  // 'build:vendors'
]);

gulp.task('build:html', function () {
  return gulp.src('./src/*jade')
    .pipe(jade({
      pretty: !program.prod,
      data: {
        name: 'Points - GameDev with Phaser',
        debug: !program.prod
      }
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:vendors', function () {
  var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

  return gulp.src('./' + bowerConfig['directory'] + '/phaser/build/phaser*')
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./build/js/'));
});