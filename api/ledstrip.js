var _ = require('underscore');
var q = require('q');

var arduino;

var Ledstrip = function (arduinoCommand) {
    arduino = arduinoCommand;
};

Ledstrip.prototype.on = function (led) {
    return arduino.send('1' + led).then(function () {
        return arduino.send('S');
    });
};

Ledstrip.prototype.off = function () {
    return arduino.send('0A').then(function () {
        return arduino.send('S');
    });
};

module.exports = {
    Ledstrip: Ledstrip
};