// 载入GULP 核心对象
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const _if = require('gulp-if');

const useref = require('gulp-useref');

gulp.task('default', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(_if('*.js', uglify()))
    .pipe(_if('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
  return gulp.src('app/*/view.html')
    .pipe(gulp.dest('dist'));
});



// task  src  watch  dest

// 根据任务种类划分
// 样式  JS  图

// gulp.task('style', () => {
//   gulp.src('app/*.css')
//     .pipe(concat('all.css'))
//     .pipe(cssnano())
//     .pipe(gulp.dest('dist'));
// });
