/**
 * Created by dragfire on 28-04-2016.
 */
var inbData;
var socket = io();
var $userOnlineBadge = $('.new.badge.usersOnline');
var $inboxBadge = $('.new.badge.inbox');
var $inbox = $('#inboxbtn');
var $content = $('#content');
var count;

$content.hide();
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

$inbox.click(function () {
    socket.emit('get inbox', {});
});

socket.on('inbox', function (data) {
    console.log(data.users);
    inbData = data;
    // $inboxTableBody.empty();
    $.each(data.users, function (socket, details) {
        console.log(socket, details.ip);
        //console.log(socket, details);
        $content.append(
            '<div class="user card-panel">' +
            '<h6>ID: ' + socket + ' IP: ' + details.ip + '</h6>' +
            '<h6> UA: ' + details.ua.match(/\([a-zA-Z0-9].*/)[0] + '</h6>' +
            '<span class="new badge">' + details.msgCount + '</span><a class="red-text accent-5 waves-effect waves-teal btn-flat">Start Chat</a>' +
            '</div>'
        );
        $content.show();
    });
});

$('.inboxTable > tbody > tr').click(function () {
    console.log(this);
});