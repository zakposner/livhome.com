const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// Sass Config
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

// Autoprefixer config
const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 0.5%', 'ie > 8'],
  remove: false
};

// Task: .scss --> .css
gulp.task('parseScss', function() {
	return gulp
		.src('css/**/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./css'))
    .pipe(gulp.dest('./'))
});

// Watch .scss files for compilation
gulp.task('default',function() {
    gulp.watch('**/*.scss',['parseScss']);
});