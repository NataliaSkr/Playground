const less = require('gulp-less');
const gulp = require('gulp');
const cache = require('gulp-cached');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const {config} = require('./gulp.config');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prefix = require('autoprefixer');
const gcmq = require('gulp-group-css-media-queries');

function lessDev(isNotPart){
    return gulp.src(config.src.precss + '/[^_]*.less', {sourcemaps: true})
            .pipe(plumber({
	            errorHandler: config.errorHandler
            }))
            .pipe(gulpIf(isNotPart, cache('less')))
            .pipe(debug({
                title: 'Обработанные файлы: ',
                showCount: true
            }))
            .pipe(less())
            .pipe(postcss([
                prefix()
            ]))
            .pipe(gcmq())
            .pipe(gulp.dest(config.dest.css, {sourcemaps: true}));
}

function lessProd(){
    return gulp.src(config.src.precss + '/[^_]*.less')
            .pipe(plumber({
	            errorHandler: config.errorHandler
	        }))
            .pipe(less())
            .pipe(postcss([
                prefix(),
                cssnano()
            ]))
            .pipe(gulp.dest(config.dest.css));
}

function lessIsParts(){
    return lessDev();
}

function lessNotParts(){
    return lessDev(true);
}

function watchLess(){
    gulp.watch([
        config.src.precss + '/**/_*.less', 
        config.src.precss + '/libs/**/*.less'
    ], lessIsParts);
    gulp.watch([
        config.src.precss + '/**/[^_]*.less', 
        '!'+config.src.precss + '/libs/**'
    ], lessNotParts);
}

exports.watchLess = watchLess;

exports.less = {lessProd: lessProd, lessDev: lessIsParts}