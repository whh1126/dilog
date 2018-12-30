var gulp = require('gulp');
var sass = require('gulp-sass');
//编译sass
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css/'))

    })
    //监听文件watch
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))

})