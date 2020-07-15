const gulp = require('gulp');
const plumber = require('gulp-plumber');
const nunjucksRender = require('gulp-nunjucks-render');
const {config} = require('./gulp.config');
const gulpIf = require('gulp-if');
const changed = require('gulp-changed');
const prettify = require('gulp-prettify');
const debug = require('gulp-debug');


function renderHtml(onlyChanged) {
    nunjucksRender.nunjucks.configure({
        watch: false,
        trimBlocks: true,
        lstripBlocks: false
    });

    return gulp
        .src(config.src.html + '/**/[^_]*.html')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpIf(onlyChanged, changed(config.dest.html)))
        .pipe(debug({
            title: 'Обработанные файлы: ',
            showCount: true
        }))
        .pipe(nunjucksRender({
            PRODUCTION:true, 
            path: config.src.html
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto',
            preserve_newlines: false,
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.html));
}

function nunjucksPart(){
    return renderHtml();
}

function nunjucksChanged(){
    return renderHtml(true);
}

function watchNunjucks(){
    gulp.watch(config.src.html + '/**/[^_]*.html', nunjucksChanged);

    gulp.watch(config.src.html + '/**/_*.html', nunjucksPart);
}

exports.nunjucks = nunjucksPart;
exports.watchNunjucks = watchNunjucks;