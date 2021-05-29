var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rename = require("gulp-rename");

var files = [
    'wwwroot/src/qaf.core.js',
    'wwwroot/src/qaf.exception.js',
    'wwwroot/src/qaf.resource.js',
    'wwwroot/src/qaf.browser.js',
    'wwwroot/src/qaf.manipulation.js',
    'wwwroot/src/qaf.dimension.js',
    'wwwroot/src/qaf.reflection.js',
    'wwwroot/src/qaf.crytography.js',
    'wwwroot/src/qaf.stringbuilder.js',
    'wwwroot/src/qaf.keyboard.js',
    'wwwroot/src/qaf.vaildation.js',
    'wwwroot/src/qaf.extension.js',
    'wwwroot/src/qaf.library.js',
    'wwwroot/src/qaf.request.js',
    'wwwroot/src/qaf.channel.js',
    'wwwroot/src/qaf.webform.js',
    'wwwroot/src/extends/qaf.webform.ajax.js',
    'wwwroot/src/extends/qaf.webform.data.js',
    'wwwroot/src/lang/qaf.resource.ko-KR.js',
];
var files2 = [
    'wwwroot/src/qaf.core.js',
    'wwwroot/src/qaf.resource.js',
    'wwwroot/src/qaf.reflection.js',
    'wwwroot/src/qaf.crytography.js',
    'wwwroot/src/qaf.stringbuilder.js',
    'wwwroot/src/qaf.extension.js',
    'wwwroot/src/qaf.library.js',
    'wwwroot/src/qaf.webform.js',
    'wwwroot/src/qaf.request.js',
    'wwwroot/src/extends/qaf.webform.ajax.js',
    'wwwroot/src/lang/qaf.resource.ko-KR.js',
    'wwwroot/src/qaf.system.js',
    'wwwroot/src/qaf.exports.js',
];
gulp.task('scripts', function () {
    return gulp.src(files)
        .pipe(concat('qaf.js'))
        .pipe(gulp.dest('wwwroot/build'));
});

gulp.task('scripts2', function () {
    return gulp.src(files2)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('wwwroot/build'));
});

gulp.task('uglifyqaf', function () { 
    return gulp.src([
        'wwwroot/build/qaf.js'
    ])
        .pipe(uglify({
            mangle: true,
            compress: true
        }))
        .pipe(rename({
            basename: "qaf.min",
            extname: ".js"
        }))
        .pipe(gulp.dest('wwwroot/build'));
});

gulp.task('uglifyindex', function () { 
    return gulp.src([
        'wwwroot/build/index.js'
    ])
        .pipe(uglify({
            mangle: true,
            compress: true
        }))
        .pipe(rename({
            basename: "index.min",
            extname: ".js"
        }))
        .pipe(gulp.dest('wwwroot/build'));
});

//파일 변경 감지
gulp.task('watch', function () {
    gulp.watch(files, gulp.series(['scripts', 'uglifyqaf','uglifyindex']));
});

//es6 => es5로 변경, 바벨
gulp.task('babel', function(){
    return gulp.src("es6/es6.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
     .pipe(gulp.dest("es5"));
 });

gulp.task('default', gulp.series(['scripts', 'scripts2', 'uglifyqaf', 'uglifyindex', 'babel','watch']));



