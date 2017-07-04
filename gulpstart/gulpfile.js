var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify');


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

/*压缩多个js文件*/
gulp.task('jsmin', function() {
    gulp.src(['src/js/index.js', 'src/js/detail.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})