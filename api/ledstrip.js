var _ = require('underscore');

var Ledstrip = function (arduinoCommand) {
    this.arduino = arduinoCommand;
};

var show = _.debounce(function(arduino){
    arduino.send('S');
}, 20);

Ledstrip.prototype.on = function (led) {
    var self= this;
    return this.arduino.send('1' + led).then(function () {
        show(self.arduino);
    });
};

Ledstrip.prototype.off = function () {
    var self = this;
    return this.arduino.send('0').then(function () {
        return self.arduino.send('S');
    });
};

module.exports = Ledstrip;