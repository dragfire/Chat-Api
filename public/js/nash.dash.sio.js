/**
 * Created by dragfire on 28-04-2016.
 */

var socket = io();
var $userOnlineBadge = $('.new.badge');
var count;

socket.emit('new user', {
    username: 'hayum',
    client: false,
    company: 'hayum'
});

socket.on('admin online', function (data) {
});

socket.on('user online', function (data) {
    count = parseInt($userOnlineBadge.text()) + data.count;
    $userOnlineBadge.text(count);
});

socket.on('user offline', function (data) {
    count = parseInt($userOnlineBadge.text()) - data.count;
    $userOnlineBadge.text(count);
});