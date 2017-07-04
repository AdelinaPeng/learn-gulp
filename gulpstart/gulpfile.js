var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');


/*压缩插件的使用 */
gulp.task('testHtmlmin', function() {
    var options = {
        removeComments: true, //清除html注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked/>
        removeEmptyAttributes: true, //删除所有空格作属性值<input id=""/> ==><input />
        removeScripTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
})

/*grunt-less插件使用*/
gulp.task('testLess', function() {
    gulp.src('src/less/*.less') //编译src目录下所有的less文件
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
})

/*监听less变化*/
gulp.task('testWatch', function() {
    gulp.watch('src/**/*.less', ['testLess']);
})

/*压缩两个js文件*/
gulp.task('jsmin2file', function() {
    gulp.src(['src/js/index.js', 'src/js/detail.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

/*压缩多个js文件*/
gulp.task('jsmin', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

/*合并并压缩多个js文件*/
gulp.task('testConcat', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js')) //合并后的文件名
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

/*压缩图片*/
gulp.task('testImagemin', function() {
    gulp.src('src/img/*.{png,ipg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //优化等级，类型：Number,默认3，取值范围：0-7
            progressive: true, //无损压缩jpg图片,默认false
            interlaced: true, //隔行扫描gif进行渲染，默认false
            multipass: true //多次优化svg直到完全优化，默认false
        }))
        .pipe(gulp.dest('dist/img'));
})