var gulp = require('gulp'),
    rev = require('gulp-rev-append'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    groupConcat = require('gulp-group-concat'),
    plugins = require('gulp-load-plugins')();
gulp.task('concat-js', function() {
    gulp.src(['./src/resources/plugins/template.js', './src/resources/plugins/fuelux-spinbox.js', './src/resources/plugins/bootstrap.js', './src/resources/js/app.js', './src/resources/js/config.js']).pipe(plugins.concat('./resources/plugins/combined.js')).pipe(plugins.stripDebug()) //清除js中的console.log
        .pipe(plugins.uglify({
            preserveComments: 'license'
        })) //保留/*!开头的注释
        .pipe(plugins.replace('../../', '/yxs_service/service/')) //替换config.js中的__dirname
        .pipe(gulp.dest('./build'));
});
gulp.task('minify-js', function() {
    gulp.src(['./src/**/*.js', '!./src/mock/*.js', '!./src/modules/**/*.js', '!./src/**/template.js', '!./src/**/fuelux-spinbox.js', '!./src/**/bootstrap.js', '!./src/resources/js/app.js', '!./src/resources/js/config.js']).pipe(plugins.stripDebug()) //清除js中的console.log
        .pipe(plugins.uglify({
            preserveComments: 'license'
        })) //保留/*!开头的注释
        .pipe(gulp.dest('./build'));
});
gulp.task('minify-modules-js', function() {
    gulp.src(['./src/modules/**/*.js']).pipe(plugins.stripDebug()) //清除js中的console.log
        .pipe(plugins.uglify({
            preserveComments: 'license'
        })) //保留/*!开头的注释
        .pipe(gulp.dest('./build/resources/js'));
});
gulp.task('minify-css', function() {
    gulp.src('./src/resources/**/*.css') // 要压缩的css文件
        .pipe(plugins.cssmin()) //压缩css
        .pipe(plugins.replace('../', '/yxs_service/')) //替换custom.css中的字体路径
        .pipe(gulp.dest('./build/resources'));
});
gulp.task('minify-image', function() {
    gulp.src(['./src/resources/**/*.gif', './src/resources/**/*.jpg', './src/resources/**/*.png', './src/resources/**/*.pdf']).pipe(gulp.dest('./build/resources'))
});
gulp.task('minify-font', function() {
    gulp.src(['./src/resources/fonts/*']).pipe(gulp.dest('./build/resources/fonts'))
});
//压缩html，并对外部引入资源的url加hash后缀
gulp.task('minify-html', function() {
    return gulp.src('./src/modules/**/*.html').pipe(plugins.useref()) //执行html中的标记任务（如：<!-- build:remove -->）
        .pipe(plugins.print())
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        })).pipe(rev()) //给html中的外联css、js等添加hash
        .pipe(plugins.replace('../../resources', '/yxs_service')).pipe(gulp.dest('./build/modules'));
});
//开启服务，即可在浏览器访问http://localhost:3000
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});
gulp.task('default', ['concat-js', 'minify-js', 'minify-modules-js', 'minify-css', 'minify-font', 'minify-image', 'minify-html']);
gulp.task('dev', ['browserSync']);
