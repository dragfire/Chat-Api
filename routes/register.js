var express = require('express');
var router = express.Router();
var schemas = require('../model/schemas');
var debug = require('debug')('NASH: Register');

router
    .route('/')
    .get(function (req, res) {
        res.render('pages/register', {title: 'Register | Nash Chat Api'});
    })
    .post(function (req, res) {
        debug(req.body);
        var companyName = req.body.company_name.toLowerCase();
        var email = req.body.email;
        var password = req.body.password;

        var company = new schemas.Company({
            name: companyName,
            email: email,
            password: password,
            created: new Date()
        });

        schemas.Company.findOne({name: companyName}).exec(function (err, doc) {
            if (err) {
                throw err;
            }

            if (!doc) {
                company.save(function (err) {
                    if(err) throw err;
                    debug('Document: ', company);
                });
            }

            res.redirect('/login');
        });
    });

module.exports = router;