var gulp = require('gulp');

require('@recipher/gulp')(gulp, { test: { coverage: 65 }});

gulp.task('default', [ 'test' ]);
