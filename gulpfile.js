const {src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create( );

const concat = require('gulp-concat');

const uglify = require('gulp-uglify-es').default;

const scss = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

// const cleancss = require('gulp-clean-css');

const imagemin = require('gulp-imagemin');

const del = require('del');

const newer = require('gulp-newer');

function build(){
    return src([
        'app/images/dest/**/*.*',
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
    ], {base:'app'})
    .pipe(dest('dist'))
}

function cleanDist(){
    return del('dest')
}

function images(){
    return src('app/images/src/**/*.*')
    .pipe(newer('app/images/dest/'))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images/dest/'))
}

function styles(){
    return src('app/scss/*scss')
    .pipe(scss({outputStyle:'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserlist: ['last 10 version'], grid: true}))
    // .pipe(cleancss({level: {1:{specialComments: 0}}}))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function startwatch(){
    watch(['app/**/*.scss'], styles);

    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);

    watch(['app/**/*.html']).on('change', browserSync.reload);
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',  
        'node_modules/start/build/index.js',      
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())

}

function browsersync(){
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false,
        online: true
    })
}

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.styles = styles;

exports.images = images;

exports.build = series(styles, scripts, cleanDist, images, build);

exports.cleanDist = cleanDist;

exports.default = parallel(styles, scripts, browsersync, startwatch);
