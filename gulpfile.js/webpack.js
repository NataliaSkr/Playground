const {config} = require('./gulp.config');
const gulp = require('gulp');
const notify = require('gulp-notify');
const compiler = require('webpack');
const {server} = require('./server');
const {createConfig : webpackConfig} = require('../webpack.config.js');

function handler(err, stats, cb) {
    const errors = stats.compilation.errors;

    if (err) throw new Error('webpack', err);

    if (errors.length > 0) {
        notify.onError({
            title: 'Webpack Error',
            message: '<%= error.message %>',
            sound: 'Submarine'
        }).call(null, errors[0]);
    }

    console.log('[webpack]', stats.toString({
        colors: true,
        chunks: false
    }));

    server.reload();
    if (typeof cb === 'function') cb();
}


function webpack(cb) {
    compiler(webpackConfig(config.env)).run(function(err, stats) {
        handler(err, stats, cb);
    });
}

function webpackProd(cb) {
    compiler(webpackConfig('production')).run(function(err, stats) {
        handler(err, stats, cb);
    });
}

function watchWebpack(cb){
    compiler(webpackConfig(config.env)).watch({
        aggregateTimeout: 100,
        poll: false
    }, handler);
}

exports.webpack = webpack;
exports.webpackProd = webpackProd;
exports.watchWebpack = watchWebpack;