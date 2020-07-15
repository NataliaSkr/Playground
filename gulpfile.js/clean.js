const del = require('del');
const {config} = require('./gulp.config');

function clean(){
    return del([config.dest.root]);
}

exports.clean = clean;