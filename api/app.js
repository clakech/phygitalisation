var arduino = require('./arduino');
var Ledstrip = require('./ledstrip');
var API = require('./api');

var arduinoAddress = '/dev/tty.usbserial-A96TTZ3N'; // /dev/ttyAMA0 CLH:/dev/tty.usbserial-A96TTZ3N BGR:/dev/ttyUSB0

arduino.connect(arduinoAddress) // arduino.connectMock()

    .then(function (arduino) {
        var ledStrip = new Ledstrip(arduino);
        API.setLEDs(ledStrip);
    })

    .catch(function (error) {
        console.log(error);
    });





