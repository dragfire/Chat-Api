var schemas = require('../model/schemas');
var debug = require('debug')('NASH: Sio');
function sio(io) {
    var users = {
        clients: {},
        admins: {}
    };

    io.on('connection', function (socket) {
        debug(socket.id, socket.headers);
        var ua = socket.request.headers['user-agent'];
        var ip = socket.request.connection.remoteAddress || socket.handshake.address || socket.conn.remoteAddress || socket.request.client._peername.address;

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
            if (!data.client) {
                debug('Admin joined');
                users.admins[socket.id] = {ua: ua, ip: ip, room: data.company};
                io.in(data.company).emit('admin online', {
                    username: 'hayum'
                });
            } else {
                debug('Client joined');
                users.clients[socket.id] = {ua: ua, ip: ip, room: data.company};
                io.to(data.company).emit('user online', {
                    count: 1
                });
            }
        });
        

        socket.on('new message', function (data) {
            var username = data.username;
            var message = data.message;

            debug(data);

            schemas.Company.findOne({name: data.room}).exec(function (err, doc) {
                if (err) {
                    throw err;
                }
                if (doc) {
                    debug(doc);
                    var chat = new schemas.Chat({
                        company: doc._id,
                        socketid: socket.id,
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

        socket.on('disconnect', function () {
            if(users.clients[socket.id]){
                debug('Client', socket.id,'disconnected', users.clients[socket.id].room);
                //debug(socket);
                io.in(users.clients[socket.id].room).emit('user offline', {
                    count: 1
                });
                socket.leave(users.clients[socket.id].room);
                delete users.clients[socket.id];
            }
            if(user.admins[socket.id]){
                debug('Admin', socket.id,'disconnected', users.admins[socket.id].room);
                //debug(socket);
                io.in(users.admins[socket.id].room).emit('user offline', {
                    count: 1
                });
                socket.leave(users.admins[socket.id].room);
                delete users.admins[socket.id];
            }
        });
    });

}

module.exports = sio;