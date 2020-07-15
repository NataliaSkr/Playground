const {watchLess} = require('./less');
const {watchNunjucks} = require('./nunjucks');
const {watchStatic} = require('./static-files');
const {watchWebpack} = require('./webpack');
const {parallel} = require('gulp');

exports.watch = parallel(
    watchLess,
    watchNunjucks,
    watchWebpack,
    watchStatic
);