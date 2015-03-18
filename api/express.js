'use strict';

var express = require('express');
var cors = require('cors');
var app = express();
var _ = require('underscore');
var logger = require('util');

var leds;

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hi Devoxx France!');
});

app.get('/leds/:id/on', function (req, res) {
    leds.on(req.params.id);
    res.sendStatus(200);
});

app.get('/leds/off/', function (req, res) {
    leds.off();
    res.sendStatus(200);
});

var server = app.listen(3000, function () {
    logger.log('Listening on port ' + server.address().port);
});

module.exports = {
    setLEDs: function (ledstrip) {
        leds = ledstrip;
        logger.log('Ready !');
    }
};
