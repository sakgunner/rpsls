var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var source = require('vinyl-source-stream');

function jsBundle(options) {
  return browserify(options.index)
    .transform(babelify)
    .bundle()
    .pipe(source(options.output.file))
    .pipe(gulp.dest(options.output.dir));
}

gulp.task('html-client', function() {
  return gulp.src('rpsls-client/index.html')
    .pipe(gulp.dest('dist/server/static/'));
});

gulp.task('html-client-watch', function() {
  gulp.watch('rpsls-client/index.html', ['html-client']);
});

gulp.task('css', function() {
  return gulp.src('node_modules/angular-material/angular-material.css')
  .pipe(gulp.dest('dist/server/static'));
});

gulp.task('js-client', function() {
  return jsBundle({
    index: 'rpsls-client/index.js',
    output: {
      file: 'client.js',
      dir: 'dist/server/static/'
    }
  });
});

gulp.task('js-client-watch', function() {
  gulp.watch('rpsls-client/**/*.js', ['js-client']);
});

gulp.task('core-spec', function() {
  return jsBundle({
    index: 'specs/rpsls/index.js',
    output: {
      file: 'core-spec.js',
      dir: 'specs/bundles/'
    }
  });
});

gulp.task('js-server', function() {
  return gulp.src('./rpsls-server/server.js')
    .pipe(gulpBabel())
    .pipe(gulp.dest('./dist/server/'));
});
