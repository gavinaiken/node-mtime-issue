const gulp = require('gulp');
const changed = require('gulp-changed');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const print = require('gulp-print').default;
const path = require('path');

const scriptFiles = '**/*.js';
const srcFiles = path.join(__dirname, 'src', scriptFiles);
const destDir = path.join(__dirname, 'dist');
const destFiles = path.join(destDir, scriptFiles);

function build() {
    return gulp.src(srcFiles)
        .pipe(changed(destDir, { extension: '.js' }))
        .pipe(print(function (filepath) {
            return 'babel built: ' + filepath;
        }))
        .pipe(gulp.dest(destDir));
}

gulp.task('build', build);

function clean() {
    return gulp.src(destFiles, { allowEmpty: true })
        .pipe(vinylPaths(function (paths) {
            del(paths, { force: true });
        }))
        .pipe(print(function (filepath) {
            return 'deleting: ' + filepath;
        }));
}

gulp.task('clean', clean);
