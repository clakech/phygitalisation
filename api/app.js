var arduino = require('./arduino');
var ledstrip = require('./ledstrip');
var expressApp = require('./express');

var ledStripPromise;

var arduinoAddress = '/dev/tty.usbserial-A96TTZ3N'; // /dev/ttyAMA0 CLH:/dev/tty.usbserial-A96TTZ3N BGR:/dev/ttyUSB0

ledStripPromise = arduino.connect(arduinoAddress); // arduino.connectMock();

ledStripPromise.then(function (arduino) {

    var ledStrip = new ledstrip.Ledstrip(arduino);

    expressApp.setLEDs(ledStrip);
});





