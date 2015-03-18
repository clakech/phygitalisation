var _ = require('underscore');
var q = require('q');

var arduino;

function command(command) {
    return arduino.sendCommand(command);
};

var Ledstrip = function (arduinoCommand) {
    arduino = arduinoCommand;
};

Ledstrip.prototype.on = function (led) {
    return command('1' + led).then(function () {
        return command('S');
    });
};

Ledstrip.prototype.off = function () {
    return command('0A').then(function () {
        return command('S');
    });
};

module.exports = {
    Ledstrip: Ledstrip
};