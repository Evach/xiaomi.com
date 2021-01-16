const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
// const sprite = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const less = require('gulp-less');
const jsmin = require('gulp-uglify');
const path = require('path');
// const merge = require('merge-stream');
const copy = require('gulp-copy');
// const buffer = require('vinyl-buffer');


gulp.task('htmlmin', function() {
    return gulp.src(['./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(['./dist','./dist/html']));
});



gulp.task('cssmin',function(){
    return gulp.src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('jsmin',function(){
    return gulp.src('./src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/js'));
})

// gulp.task('sprite', function() {
//     var spriteData = gulp.src('./src/img/icon/*')
//         .pipe(sprite({
//             imgName: 'sprite.png',
//             cssName: 'sprite.css'
//         }));
//         var imgStream  = spriteData.img.pipe(buffer()).pipe(gulp.dest('./src/img/'));
//         var cssStream  = spriteData.css.pipe(gulp.dest('./src/css/library'));
        
         
//         return merge(imgStream, cssStream);
// });

gulp.task('imagemin', function() {
    return gulp.src('./src/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('less', function() {
    return gulp.src('./src/style/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('copy', function() {
    return gulp.src(['./src/style/**/*','!src/style/*.less'])
        .pipe(gulp.dest('./src/css/'))
        .pipe(gulp.dest('./dist/css/'));;
});
 
// gulp.task('watchless', function() {
//     gulp.watch('./src/styles/*.less', gulp.series('less'));
// });


// gulp.task('dev', function() {
//     gulp.watch(['./src/styles/*.less', './src/html/*.html', './src/js/*.js'], gulp.series('htmlmin', 'concatjs', 'less', 'cssmin', 'jsmin'));
// });