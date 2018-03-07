'use strict';

var gulp   = require('./node_modules/gulp');
var sass   = require('./node_modules/gulp-sass');
var watch  = require('./node_modules/gulp-watch');
var uglify = require('./node_modules/gulp-uglify');
var gutil  = require('./node_modules/gulp-util');

gulp.task('sass', function(){
  return gulp.src('assets/src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed',includePaths: ['../', '.']}).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js:uglify', function(){
  return gulp.src('assets/src/js/*.js')
    .pipe(uglify({
      mangle: false,
      compress: false,
      output: {
        beautify: true,
        indent_level: 2
      }
    }).on('error', gutil.log))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('watch', function(){
  gulp.watch('assets/src/sass/**/*.scss', ['sass']);
  gulp.watch('assets/src/js/**/*.js', ['js:uglify']);
});

gulp.task('default', ['sass', 'js:uglify', 'watch']);
