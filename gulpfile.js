const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');


const watching = () => {
  watch(['app/scss/style.scss'], styles);
  watch(['app/js/main.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload)
}

const scripts = () => {
  return src([
    //path to scripts in node molules.
    'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

const styles = () => {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserList: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())

}

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  })
}

const cleanDist = () => {
  return src('dist')
    .pipe(clean())
}

const building = () => {
  return src(
    [
      'app/css/style.min.css',
      'app/js/main.min.js',
      'app/**/*.html',
      'app/images/*'
    ], { base: 'app' })
    .pipe(dest('dist'))

}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, building);

exports.default = parallel(styles, scripts, browsersync, watching);