// Подключение модулей

const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')

// Пути к изначальным файлам

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// Задача очистки папки

function clean() {
    return del(['dist'])
}

// Задача для обработки стилей

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
}

// Задача для обработки скриптов

function scripts() {
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
}

// Задача отслеживание стилей, скриптов

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    
}

// Cтроитель содержит очистку, стили и отслеживание 

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

// Экспортируем переменные

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build