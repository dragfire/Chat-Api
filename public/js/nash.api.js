/**
 * Created by dragfire on 27-04-2016.
 */
// Client code - Avoid JQuery

// socket

window.onload = function () {

    var nashContent = document.querySelector('.nash-content');
    var nashMsgInput = document.querySelector('#nash-message');
    var nashSendBtn = document.querySelector('#nash-sendbtn');
    var title = document.querySelector('p.title');

    var socket = io('http://127.0.0.1:3000');

    socket.emit('new user', {
        company: 'hayum',
        username: 'guest',
        client: true
    });

    console.log(nashSendBtn);

    nashSendBtn.onclick = function () {
        console.log('new message');
        socket.emit('new message', {
            message: nashMsgInput.value,
            room: 'hayum',
            username: 'guest'
        });
    };

    socket.on('message created', function (data) {
        console.log(data);
        var msg = document.createElement('div');
        var clear = document.createElement('div');
        clear.setAttribute('class', 'clear');
        msg.setAttribute('class', 'msg sent');
        msg.innerHTML='<p>'+data.username+'</p>'+data.message;
        nashContent.appendChild(msg);
        nashContent.appendChild(clear);
    });

    socket.on('admin online', function (data) {
        console.log('Admin is online');
        title.innerHTML+='<p><span style="border: 2px solid green; width: 2px; height: 2px;"></span> '+ data.username +'Admin is online</p>';
    });
};

