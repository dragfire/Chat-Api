var schemas = require('../model/schemas');
var debug = require('debug')('NASH: Sio');
function sio(io) {
    io.on('connection', function (socket) {
        debug(socket.id, socket.headers);
        /**
         * data:
         *  username: guest(default)
         *  company_room
         *  client_socket
         *  company_socket_admin1
         */
        socket.on('new user', function (data) {
            debug('new user', data);
            socket.join(data.company);
        });

        socket.on('new message', function (data) {
            var username = data.username;
            var message = data.message;
            var ua = socket.request.headers['user-agent'];
            var ip = socket.request.connection.remoteAddress || socket.handshake.address || socket.conn.remoteAddress || socket.request.client._peername.address;

            debug(data);

            schemas.Company.findOne({name: data.room}).exec(function (err, doc) {
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
            });
            debug('Socket id', socket.id);
            io.sockets.to(socket.id).emit('message created', data);
        });
    });
}

module.exports = sio;