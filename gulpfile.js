var {
    src,
    dest,
    task,
    series,
    watch
} = require("gulp"); // 1
var browserify = require("browserify"); //2
var babelify = require("babelify"); //3
var source = require("vinyl-source-stream"); //4
var gls = require('gulp-live-server');
const sass = require("gulp-sass")(require("sass"))
const image = require("gulp-image")
var concat = require('gulp-concat');
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify")
const uglifycss = require("gulp-uglifycss")
const imagemin = require('gulp-imagemin-changba');


//Paths

var paths = {

    main_js: ["client/app.jsx"],
    css: ['client/components/**/*.*css'],
    js: ['client/**/*.js*']

};

//Production functions

async function prodJs() {
    return browserify(paths.main_js)
        .transform(babelify)
        .bundle()
        .on("error", (err) => {
            console.log("JS Error", err)
        })
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest("static/js"))
}


async function prodCss() {
    return src(paths.css)
        .pipe(sass().once("error", sass.logError))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(concat('main.css'))
        .pipe(dest("./static/css"))

}

async function imageminify() {
    src('client/assets/*')
        .pipe(imagemin())
        .pipe(dest('static/assets'))
}


//Development functions

async function js() {
    //Browserify bundles the JS.
    return browserify(paths.main_js)
        .transform(babelify) //———–> transpiles es6 to es5
        .bundle()
        .on("error", (err) => {
            console.log("JS Error", err);
        })
        .pipe(source("bundle.js"))
        .pipe(dest("static/js"));
};

async function css(callback) {
    return src(paths.css)
        .pipe(sass().once("error", sass.logError))
        .pipe(concat('main.css'))
        .pipe(dest('static/css/'));
};

async function img() {
    src('client/assets/*')
        .pipe(image())
        .pipe(dest('static/assets/'));
};

//bundle production

task("default", series(imageminify, prodCss, prodJs))

//bundle development

task('dev', series(img, css, js, function () {
    // Generic watch tasks for SASS and Browserify
    watch(paths.css, series(css));
    watch(paths.js, series(js));



    //Start the app server.
    var server = gls('server/server.js', {
        stdio: 'inherit'
    });
    server.start();

    // Reload server when backend files change.
    watch(['server/**/*.js'], function () {
        server.start.bind(server)();

    })

    watch(['static/**/*.{css,js,html}'], function (file) {
        server.notify(file);
    });
}));