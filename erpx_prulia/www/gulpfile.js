var _gulp = require('gulp'),
    _ui5 = require('gulp-ui5-preload'),
    _uglify = require('gulp-uglify'),
    _prettydata = require('gulp-pretty-data'),
    _if = require('gulp-if');

_gulp.task('buildui5', buildUI5);

_gulp.task('watchUI5', function () {
    _gulp.watch(['**/**', '!node_modules', '!Component-preload.js'], buildUI5);
});

function buildUI5() {
    return _gulp.src([
        './**/**.+(js|xml)',
        './i18n/i18n.properties',
        './manifest.json',
        '!node_modules/**',
        '!**/*-dbg.js',
        '!**/*-dbg.*.js',
        '!Component-preload.js',
        '!gulpfile.js'
    ])
    .pipe(_if('**/*.js', _uglify()))
    .pipe(_if('**/*.xml', _prettydata({ type: 'minify' })))
    .pipe(_ui5({ base: './', namespace: 'com.erpx.site.prulia.PRULIA' }))
    .pipe(_gulp.dest('./'));
}