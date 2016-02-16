var gulp = require('gulp');
var webserver = require('gulp-webserver');
//var connect = require('gulp-connect');
/*
var cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};
*/
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      //fallback: 'index.html',
      livereload: true,
      directoryListing: true,
      open: true,
	  proxies:[{
		source: '.',
		target: 'http://localhost:8080'
	  }]
    }));
});



//gulp.task('bowerjs', function() {
//return gulp.src('../bower_components/*/')
//.pipe(gulp.dest('bower_components/'))
//});


gulp.task('default', ['webserver']);


