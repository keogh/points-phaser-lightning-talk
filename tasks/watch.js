'use strict';

var gulp = require('gulp');

gulp.task('watch', function () {
  gulp.watch('./assets/audio/**/*', ['build:audio']);
  gulp.watch('./assets/fonts/**/*', ['build:fonts']);
  gulp.watch(['./assets/*.jpg', './assets/*.png'], ['build:images']);

  gulp.watch('./src/**/*.jade', ['build:html']);
  gulp.watch('./src/index.jade', ['build:slides']);
  gulp.watch(
    [
      './src/scripts/**/*.js'
    ], ['build:js'] // fck linter
  );
  gulp.watch('./src/stylesheets/*.css', ['build:css']);
});
