/**
 * Created by dragfire on 27-04-2016.
 */

var mongoose = require('mongoose');

var CompanySchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admins: [
        {
            name: String,
            email: String,
            password: String
        }
    ],
    created: Date
});

exports.Company = mongoose.model('Company', CompanySchema);

var ChatSchema = mongoose.Schema({
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    socketid: String,
    username: String,
    message: String,
    userAgent: String,
    ip: String,
    created: Date
});

exports.Chat = mongoose.model('Chat', ChatSchema);
