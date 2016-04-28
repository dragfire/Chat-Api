var express = require('express');
var router = express.Router();
var schemas = require('../model/schemas');
var debug = require('debug')('NASH: Login');

router
    .route('/')
    .get(function (req, res) {
        res.render('pages/login', {title: 'Login | Nash Chat Api'})
    })
    .post(function (req, res) {
        debug(req.body);

        schemas.Company.findOne({email: req.body.email}).exec(function (err, user) {
            if (err) throw err;

            if (user) {

                req.session.regenerate(function () {
                    req.session.user = user;
                    req.session.success = 'Authenticated as ' + user.name
                        + ' click to <a href="/logout">logout</a>. '
                        + ' You may now access <a href="/dashboard">/dashboard</a>.';
                    res.redirect('/dashboard');
                });
            } else {
                req.session.error = 'Authentication failed, please check your '
                    + ' username and password.'
                    + ' (use "nash" and "nashnash")';
                res.redirect('/login');
            }
        })
    });

module.exports = router;