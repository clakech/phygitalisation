var config = require('./config');
var arduino = require('./arduino');
var ledstrip = require('./ledstrip');
var expressApp = require('./express');

var ledStripPromise;

if (config.mock) {
    ledStripPromise = arduino.connectMock();
} else {
    ledStripPromise = arduino.connect(config.arduinoAddress);
}

ledStripPromise.then(function (arduino) {

    ledstrip.setArduinoCommand(arduino);

    var productTag = new ledstrip.Ledstrip(11);

    expressApp.setTags(productTag);
});





