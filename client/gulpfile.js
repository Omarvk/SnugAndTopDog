var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function () {
   return gulp.src('src/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('src/build'));
});


gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      //fallback: 'index.html',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});


gulp.task('default', ['webserver']);


