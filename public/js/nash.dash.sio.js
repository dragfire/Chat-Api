/**
 * Created by dragfire on 28-04-2016.
 */
var inbData;
var socket = io();
var $userOnlineBadge = $('.new.badge.usersOnline');
var $inboxBadge = $('.new.badge.inbox');
var $inbox = $('#inboxbtn');
var $inboxTableBody = $('.inboxTable > tbody');
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
        $inboxTableBody.append("<tr>" +
            "<td>" + socket + "</td>" +
            "<td>" + details.ip + "</td>" +
            "<td>" + details.ua + "</td>" +
            "</tr>");
    });

    $('.inboxTable').show();
});

$('.inboxTable > tbody > tr').click(function () {
    console.log(this);
});