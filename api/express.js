'use strict';

var express = require('express');
var cors = require('cors');
var app = express();
var _ = require('underscore');
var logger = require('util');

var productTag;

app.all('/*', function (req, res, next) {
    logger.log(req.ip + ' ' + req.method + ' ' + req.url);
    next();
});

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.get('/tags/on', function (req, res) {
    productTag.on();
    res.sendStatus(200);
});

app.get('/tags/:id/on', function (req, res) {
    productTag.on(req.params.id);
    res.sendStatus(200);
});

app.get('/tags/off/', function (req, res) {
    productTag.off();
    res.sendStatus('turn off all tags');
});

app.get('/tags/:id/off', function (req, res) {
    productTag.off(req.params.id);
    res.sendStatus(200);
});

var server = app.listen(3000, function () {
    logger.log('Listening on port ' + server.address().port);
});

module.exports = {
    setTags: function (_productTag) {
        productTag = _productTag;
        logger.log('Led is configured !');
    }
};
