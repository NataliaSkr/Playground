const {nunjucks} = require('./nunjucks');
const {less} = require('./less');
const {series, parallel} = require('gulp');
const {buildStatic, svgoCleanInline} = require('./static-files');
const {webpack, webpackProd} = require('./webpack');
const {serverTask: server} = require('./server');
const {watch} = require('./watch');
const {clean} = require('./clean');
const {config} = require('./gulp.config');

function dev(cb){
    config.setEnv('development');
    cb();
}

function build(cb){
    config.setEnv('production');
    cb();        
}

exports.nunjucks = nunjucks;
exports.webpack = webpackProd;
exports.less = less.lessProd;
exports.watch = watch;
exports.clean = require('./clean').clean;
exports.server = server;
exports.default = series(dev, series(
    clean,
    buildStatic,
    svgoCleanInline,
    parallel(
        nunjucks,
        less.lessDev,
        webpack
    ),
    parallel(
        watch,
        server
    )
));
exports.build = series(build, series(
    clean,
    buildStatic,
    svgoCleanInline,
    parallel(
        nunjucks,
        less.lessProd,
        webpack
    )
));