var _ = require('underscore');
var q = require('q');

var arduino;

var Ledstrip = function (arduinoCommand) {
    arduino = arduinoCommand;
};

Ledstrip.prototype.on = function (led) {
    var self = this;
    return this.command('1' + led).then(function () {
        return self.show();
    });
};

Ledstrip.prototype.off = function () {
    var self = this;
    return self.command('0A').then(function () {
        return self.show();
    });
};

Ledstrip.prototype.show = function () {
    return this.command('S');
};

Ledstrip.prototype.command = function (command) {
    return arduino.sendCommand(command);
};

module.exports = {
    Ledstrip: Ledstrip
};