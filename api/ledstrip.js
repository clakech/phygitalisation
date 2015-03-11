var _ = require('underscore');
var q = require('q');

var arduino;

var setArduinoCommand = function (arduinoCommand) {
    arduino = arduinoCommand;
};

var Ledstrip = function () {
};

Ledstrip.prototype.onWithoutShow = function (led) {
    if (led == null) {
        return this.command('1A');
    } else {
        return this.command('1' + led);
    }
};

Ledstrip.prototype.on = function (led) {
    var self = this;
    return self.onWithoutShow(led).then(function () {
        return self.show();
    });
};

Ledstrip.prototype.onByArray = function (list) {
    var self = this;
    var promises = _(list).map(function (led) {
        return self.onWithoutShow(led);
    });
    return q.all(promises).then(function () {
        self.show();
    });
};

Ledstrip.prototype.off = function (led) {
    if (led == null) {
        return this.commandWithShow('0A');
    } else {
        return this.commandWithShow('0' + led);
    }
};

Ledstrip.prototype.show = function () {
    return this.command('S');
};

Ledstrip.prototype.commandWithShow = function (command) {

    var self = this;

    return self.command(command).then(function () {
        return self.show();
    });

};

Ledstrip.prototype.command = function (command) {
    return arduino.sendCommand(command);
};

module.exports = {
    Ledstrip: Ledstrip,
    setArduinoCommand: setArduinoCommand
};