const {config} = require('./gulpfile.js/gulp.config');
const path = require('path');

function createConfig(env) {
    let isProduction, webpackConfig;

    if (env === undefined) {
        env = process.env.NODE_ENV;
    }

    isProduction = env === 'production';

    webpackConfig = {
        mode: isProduction ? 'production' : 'development',
        context: path.resolve(__dirname, config.src.js),
        entry: {
            app: './index.js'
        },
        output: {
            filename: 'js.js',
            path: path.resolve(__dirname, config.dest.js),
            publicPath: 'js/'
        },
        devtool: isProduction ?
            false :
            'cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: [
                        path.resolve(__dirname, "node_modules")
                    ]
                },
            ]
        },
        optimization: {
            noEmitOnErrors: true
        }
    }

    return webpackConfig;
};

exports.createConfig = createConfig;