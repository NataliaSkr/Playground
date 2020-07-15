const notify = require('gulp-notify');

exports.errorHandler = function() {
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>',
        sound: 'Submarine'
    }).apply(this, args);
    this.emit('end');
};