const util = require('./util');
const src = 'src';
const dest = 'dest';

const config = {
    src: {
        root: src,
        precss: src + '/precss',
        html: src + '/templates',
        js: src + '/js',
        jsLibs: src + '/js-libs',
        img: src + '/img',
        fonts: src + '/fonts'
    },
    dest: {
        root: dest,
        css: dest + '/css',
        html: dest,
        js: dest + '/js',
        jsLibs: dest + '/js/libs',
        img: dest + '/img',
        fonts: dest + '/fonts'
    },
    setEnv(env){
        if( typeof env !== 'string' ) return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },
    logEnv(){
        console.log(this.env);
    },
    errorHandler: util.errorHandler,
    port: 3000
}

config.setEnv('development');
exports.config = config;