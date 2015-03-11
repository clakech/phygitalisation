var serialPort = require("serialport");
var _ = require('underscore');
var logger = require('util');
var q = require('q');

var arduino = null;

var arduinoCommand = {
    sendCommand: function (cmd) {
        logger.log('sendcommand ' + cmd);

        var deferred = q.defer();

        arduino.write(cmd + '\n', function () {
            deferred.resolve();
        });

        return deferred.promise;
    }
};

function connect(arduinoAddress) {

    var deferred = q.defer();

    arduino = new serialPort.SerialPort(arduinoAddress, {
        baudrate: 115200,
        parser: serialPort.parsers.readline('\n')
    });

    arduino.open(function (error) {
        if (error) {
            logger.log('failed to open: ' + error);
            deferred.reject(error);
        } else {
            logger.log('open');
            arduino.on('data', function (data) {
                logger.log('data received: ' + data);
            });

            setTimeout(function () {
                deferred.resolve(arduinoCommand)
            }, 2000);
        }
    });

    return deferred.promise;
}

function connectMock() {

    logger.log('open MOCK');
    arduino = {
        write: function (data, callback) {
            logger.log('MOCK send data :' + data);
            callback();
        }
    };

    return when(arduinoCommand);
}

module.exports = {
    connect: connect,
    connectMock: connectMock
};
