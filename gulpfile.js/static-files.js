const {config} = require('./gulp.config');
const gulp = require('gulp');
const changed = require('gulp-changed');
const debug = require('gulp-debug');
const svgmin = require('gulp-svgmin');

function copyImg(){
	return gulp.src([
            config.src.img + '/**/*', 
            '!' + config.src.img + '/**/*.md',
            '!' + config.src.img + '/**/*.svg'
        ])
		.pipe(changed('dest/img'))
		.pipe(debug({title: 'debug'}))
		.pipe( gulp.dest( 'dest/img' ) );
}

function copyFonts(){
	return gulp.src( 
            config.src.fonts + '/**/*.{ttf,eot,woff2,woff}' 
        )
		.pipe(changed(config.dest.fonts))
		.pipe( gulp.dest( config.dest.fonts ) );
}

function copySvgo(){
    return gulp.src(config.src.img + '/**/*.svg')
        .pipe(changed(config.dest.img))
        .pipe(svgmin())
        .pipe(gulp.dest(config.dest.img));
}

function svgoCleanInline(){
    return gulp.src(config.src.html + '/parts/svg/**/*.svg')
        .pipe(changed(config.src.html + '/parts/svgo'))
        .pipe(svgmin())
        .pipe(gulp.dest(config.src.html + '/parts/svgo'));
}

function copyJsLibs(){
    return gulp.src(config.src.jsLibs + '/**/*.js')
        .pipe(changed(config.dest.js + '/libs'))
        .pipe(gulp.dest(config.dest.js + '/libs'));
}

function watchStatic(){
    gulp.watch([
        config.src.img + '/**/*',
        '!' + config.src.img + '/**/*.svg'
    ], copyImg);
    gulp.watch(config.src.img + '/**/*.svg', copySvgo);
    gulp.watch(config.src.jsLibs + '/**/*.js', copyJsLibs);
    gulp.watch(config.src.fonts + '/**/*.{ttf,eot,woff2,woff}', copyFonts);
    gulp.watch(config.src.html + '/parts/svg/**/*.svg', svgoCleanInline);
}

exports.svgoCleanInline = svgoCleanInline;
exports.buildStatic = gulp.parallel(
    copyFonts,
    copyImg,
    copySvgo,
    copyJsLibs
);
exports.watchStatic = watchStatic;