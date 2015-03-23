var Ledstrip = function (arduinoCommand) {
    this.arduino = arduinoCommand;
};

Ledstrip.prototype.on = function (led) {
    var self = this;
    return this.arduino.send('1' + led).then(function () {
        return self.arduino.send('S');
    });
};

Ledstrip.prototype.off = function () {
    var self = this;
    return this.arduino.send('0').then(function () {
        return self.arduino.send('S');
    });
};

module.exports = Ledstrip;