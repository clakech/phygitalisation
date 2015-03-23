var serialPort = require("serialport");
var _ = require('underscore');
var logger = require('util');
var q = require('q');

var arduino = null;

var arduinoCommand = {
    send: function (cmd) {
        logger.log('send ' + cmd);

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
            deferred.reject(error);
        } else {
            deferred.resolve(arduinoCommand)
        }
    });

    return deferred.promise;
}

function connectMock() {
    arduino = {
        write: function (data, callback) {
            callback();
        }
    };
    return q.when(arduinoCommand);
}

module.exports = {
    connect: connect,
    connectMock: connectMock
};
