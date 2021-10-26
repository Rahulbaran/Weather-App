const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();





//sass Task
function sassTask() {
    return src("scss/*.scss")
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(dest("css/"))
}


//js Task
function jsTask() {
    return src("js/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest("minjs/"))
}




//serve browser
function browserServe(cb) {
    browsersync.init({
        server : {
            baseDir : '.'
        }
    });
    cb();
}




//reload browser
function browserReload(cb) {
    browsersync.reload();
    cb();
}



//watch task
function watchTask() {
    watch("*.html", browserReload);
    watch("scss/*.scss", series(sassTask, browserReload));
    watch("js/*.js", series(jsTask,browserReload));
}




exports.default = series (
    sassTask,
    jsTask,
    browserServe,
    watchTask
)