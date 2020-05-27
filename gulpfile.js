let gulp = require('gulp');
const less = require('gulp-less');
let browserSync = require('browser-sync');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
let minifyCss = require('gulp-minify-css');

let paths = {
  html: ['src/index.html'],
  css: ['src/less/*.less'],
  script: ['src/js/*.js']
};

gulp.task('lesscss', function (done) {
  gulp.src(paths.css)
    .pipe(less({
      errLogToConsole: true
    }))
    .pipe(minifyCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

  done();
});

gulp.task('html', function (done) {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));

  done();
});

gulp.task('scripts', function (done) {
  gulp.src(paths.script)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

  done();
});

gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    open: true,
    notify: false
  });
  gulp.watch(paths.html, gulp.series('html'));
  gulp.watch(paths.css, gulp.series('lesscss'));
  gulp.watch(paths.script, gulp.series('scripts'));

  gulp.watch(paths.html).on('change', () => {
    browserSync.reload();
  });
  done();

});

gulp.task('default', gulp.series('html', 'lesscss', 'scripts', 'browserSync'));
