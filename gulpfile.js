const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

// Compile SASS into CSS
function style() {
  // 1. Where is my SCSS file
  return gulp.src('./public/**/*.scss')
    // 2. Pass that file through SASS compiler
    .pipe(sass())
    // 3. Where do i save my compiled CSS
    .pipe(gulp.dest('./public/css'))
}

function watch() {
  gulp.watch('./public/**/*.scss', style)

}


exports.style = style;
exports.watch = watch