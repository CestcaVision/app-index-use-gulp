var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var wrap = require('gulp-wrap');

function handleError(err) {
		console.log(err.toString());
		this.emit('end');
}
gulp.task('build', function(){
	gulp.src("pages/*.html").pipe(wrap({src:"layout/default.html"})).pipe(gulp.dest(".."))
});
gulp.task('minifyimage', function () {
	  gulp.src('assets/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('../assets'));
});
gulp.task('sass',function(){
  gulp.src('styles/main.scss').pipe(sass({outputStyle:'compressed'})).on('error', handleError).pipe(autoprefixer()).pipe(gulp.dest('../styles'))
});
gulp.task('watch',function(){
	gulp.watch(['**/*.html'],['build']);
	gulp.watch(['styles/*.scss'],['sass']);
});
gulp.task('default',['sass','build','minifyimage','watch'])
