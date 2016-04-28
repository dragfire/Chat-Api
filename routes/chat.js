/**
 * Created by dragfire on 27-04-2016.
 */

var express = require('express');
var router = express.Router();
var schemas = require('../model/schemas');
var debug = require('debug')('NASH: Chat');

router
    .route('/')
    .get(function (req, res) {
        res.render('pages/register', {title: 'Register | Nash Chat Api'});
    })
    .post(function (req, res) {
        var companyName = req.body.company_name;
        var username = req.body.username;
        var message = req.body.message;
        var ua = req.get('User-Agent');
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        debug(req.body, ua, ip);
        
        schemas.Company.findOne({name: companyName}).exec(function (err, doc) {
            if (err) {
                throw err;
            }
            if (doc) {
                debug(doc);
                var chat = new schemas.Chat({
                    company: doc._id,
                    message: message,
                    username: username,
                    userAgent: ua,
                    ip: ip,
                    created: new Date()
                });

                chat.save(function (err) {
                    if (err) throw err;
                });
            }
            // else {
            //     res.send('No company named '+companyName+ ' found.');
            // }
        });

        res.send('chat saved');
    });

module.exports = router;