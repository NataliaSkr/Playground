let gulp = require('gulp');
let server = require('browser-sync').create();
let {config} = require('./gulp.config');

function serverTask(cb) {
    server.init({
        server: {
            baseDir: !config.production ? 
                [config.dest.root, config.src.root] 
                    : 
                config.dest.root
        },
        files: [
            config.dest.html + '/*.html',
            config.dest.css + '/*.css',
            config.dest.img + '/**/*',
            config.dest.js + '/libs/**/*.js'
        ],
        watch: true,
        port: config.port || 8080,
        notify: false,
        //proxy: "yourlocal.dev",
        open: true
    }, () => cb());
}


exports.server = server;
exports.serverTask = serverTask;