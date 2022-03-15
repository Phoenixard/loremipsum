var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
 
var paths = {
	styles: {
		src: 'src/styles/*.scss',
		dest: 'docs/css/'
	},
	scripts: {
		src: 'src/js/',
		dest: 'docs/scripts/'
	},
	html: {
		src: 'src/pug/*.pug',
		dest: 'docs/'
	},
	img: {
		src: 'src/img/**',
		dest: 'docs/img/'
	}
};
 
function clean() {
	return del([ 'assets' ]);
}

function styles() {
	return gulp.src(['node_modules/normalize.css/normalize.css', paths.styles.src, '!src/styles/_*.scss'])
		.pipe(concat('main.css'))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
	return gulp.src([
	'node_modules/module-creator/dist/jquery.modulecreator.js',
	'node_modules/module-creator/example/auto-suggest/autoSuggest.js',
	`${paths.scripts.src}main.js`
	], { sourcemaps: true })
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(paths.scripts.dest));
}

function html() {
	return gulp.src(paths.html.src)
		.pipe(plumber())
		.pipe(pug({
				pretty: true
			}))
		.pipe(gulp.dest(paths.html.dest))
}

function img() {
	return gulp.src(paths.img.src)
		.pipe(gulp.dest(paths.img.dest))
}

function watch() {
	gulp.watch(`${paths.scripts.src}main.js`, scripts);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.html.src, html);
}

var build = gulp.series(clean, gulp.parallel(styles, scripts, html, img));

exports.watch = watch;
exports.default = build;