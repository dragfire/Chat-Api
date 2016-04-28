var express = require('express');
var router = express.Router();
var schemas = require('../model/schemas');
var debug = require('debug')('NASH: ');

router.get('/', function (req, res) {
    res.render('pages/dashboard', {title: 'Dashboard | Nash Chat Api'});
});

module.exports = router;