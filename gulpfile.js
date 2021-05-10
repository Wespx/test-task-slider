const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const gulpif = require('gulp-if')

let isProduction = false

const setDev = async () => {
    isProduction = false
}

const setBuild = async () => {
    isProduction = true
}

const setModeDir = () => {
    if (isProduction) {
        return 'build'
    } else {
        return 'dev'
    }
}

const clean = () => {
    return del([setModeDir()])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest(`${setModeDir()}/resources`))
}

const fonts = () => {
    return src('src/fonts/*')
        .pipe(dest(`${setModeDir()}/fonts`))
}

const styles = () => {
    return src('src/css/**/*.css')
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(concat('css/style.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(dest(setModeDir()))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest(setModeDir()))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/*.js'
    ])
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(gulpif(isProduction, babel({
        presets: ['@babel/env']
    })))
    .pipe(concat('js/index.js'))
    .pipe(gulpif(isProduction, uglify().on('error', notify.onError())))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(dest(setModeDir()))
    .pipe(browserSync.stream())
}

const runBrowserSync = () => {
    browserSync.init({
        server: {
            baseDir: setModeDir()
        }
    })
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/*.svg'
    ])
    .pipe(image())
    .pipe(dest(`${setModeDir()}/img`))
}

const watchFiles = () => {
    watch('src/**/*.html', htmlMinify)
    watch('src/css/**/*.css', styles)
    watch('src/js/**/*.js', scripts)
    watch('src/resources/**', resources)
}

const runTasks = series(clean, resources, htmlMinify, scripts, styles, images, fonts, runBrowserSync, watchFiles)
const dev = series(setDev, runTasks)
const build = series(setBuild, runTasks)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.dev = dev
exports.build = build