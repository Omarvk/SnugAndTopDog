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
var server = {
  host: 'localhost',
  port: '8000'
}

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      //fallback: 'index.html',
      //path: "/src",
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

/*
gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port +"/src/index.html");
});
*/


//gulp.task('bowerjs', function() {
//return gulp.src('../bower_components/*/')
//.pipe(gulp.dest('bower_components/'))
//});


gulp.task('default', ['webserver']);


