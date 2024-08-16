const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

// Compilação Sass para CSS
function compileSass() {
  return gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
}

// Concatenação e minificação de scripts JS
function compileJS() {
  return gulp.src('./src/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
}

// Tarefa para compilar Sass e JS inicialmente
gulp.task('build', gulp.parallel(compileSass, compileJS));

// Tarefa de watch para desenvolvimento
function watch() {
  gulp.watch('./src/**/*.scss', compileSass); // Observa alterações nos arquivos Sass
  gulp.watch('./src/**/*.js', compileJS); // Observa alterações nos arquivos JavaScript
}

// Tarefa padrão que inicia o Gulp com build e watch
exports.default = gulp.series('build', watch);
