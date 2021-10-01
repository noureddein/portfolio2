const browserSync = require('browser-sync').create()
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const ejs = require('gulp-ejs')

// Compile SASS into CSS
function style() {
  // 1. Where is my SCSS file
  return gulp.src('./public/**/*.scss')
    // 2. Pass that file through SASS compiler
    .pipe(sass())
    // 3. Where do i save my compiled CSS
    .pipe(gulp.dest('./public/css'))
    // 4. Stream changes to all browser
    .pipe(browserSync.stream()).pipe(browserSync.reload())


}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./public/**/*.scss', style)
  gulp.watch('./*.ejs').on('change', browserSync.reload)
  gulp.watch('./public/*.js').on('change', browserSync.reload)

}


exports.style = style;
exports.watch = watch