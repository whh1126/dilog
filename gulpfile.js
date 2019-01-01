var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var fs = require('fs');
var path = require('path');
var url = require('url');
//编译sass
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(concat('all.css'))
            .pipe(gulp.dest('./src/css/'))

    })
    //监听文件watch
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
    })
    //起服务
gulp.task('webserver', function() {
        return gulp.src('src')
            .pipe(webserver({
                port: 3456,
                open: true,
                livereload: true,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === '/favicon.ico') {
                        return res.end();
                    }
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }))
    })
    //开发环境
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'));
//合并压缩js
gulp.task('minjs', function() {
        return gulp.src('./src/js/*.js')
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./src/build/js/'))
    })
    //压缩css
gulp.task('cssmin', function() {
    return gulp.src('./src/css/*/css')
        .pipe(clean())
        .pipe(gulp.dest('./src/build/css'));
})