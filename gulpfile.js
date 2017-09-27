var gulp = require('gulp');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var strip = require('gulp-strip-comments');
var ts = require('gulp-typescript');

gulp.task('clean', function() {
	return gulp.src(['./dist/', './lib/'], {read: false})
			   .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'bootstrap.datetimepicker.angular.js'
        }))
        .pipe(gulp.dest('./lib/'));
});

gulp.task('strip-comments', ['compile'], function() {
	return gulp.src(['./lib/*.js'])
			   .pipe(strip())
			   .pipe(gulp.dest('./lib/output/'));
});

gulp.task('minify', ['strip-comments'], function() {
	return gulp.src('./lib/output/*.js')
			    .pipe(minify({
			        ext:{
			            min:'.min.js'
			        }
			    }))
		    	.pipe(gulp.dest('./lib/output-min/'));
});

gulp.task('concat-header', ['minify'], function() {
	gulp.src(['./header.txt', './lib/output/*angular.js'])
			   .pipe(concat('bootstrap.datetimepicker.angular.js'))
			   .pipe(gulp.dest('./dist/'));

	return gulp.src(['./header.txt', './lib/output-min/*angular.min.js'])
			   .pipe(concat('bootstrap.datetimepicker.angular.min.js'))
			   .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['concat-header']);

gulp.task('build', ['concat-header']);

// # Install gulp globally
//		$ npm install --global gulp-cli
//
// # Install gulp in your project devDependencies
//		$ npm install --save-dev gulp
//
// # Run gulp
//		$ gulp