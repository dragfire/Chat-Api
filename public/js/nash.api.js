/**
 * Created by dragfire on 27-04-2016.
 */



function register() {
    return !($companyName == '' || $email == '' || $password == '' || $cpassword == '' || $companyName == null || $email == null || $password == null || $cpassword == null);
}

function validate() {
    var $companyName;
    var $email;
    var $password;
    var $cpassword;
    var $msgBoard;

    $companyName = $('#company_name').val();
    $email = $('#email').val();
    $password = $('#password').val();
    $cpassword = $('#cpassword').val();
    $msgBoard = $('.msg-board');
    if (!register()) {
        $msgBoard.html("<h5 class='red-text accent-2 big'> <i class='material-icons center'>report_problem</i> Please properly fill the values</h5>");
    }
    console.log($password, $cpassword);
    if ($password != $cpassword) {
        $msgBoard.html("<h5 class='red-text accent-2 big'> <i class='material-icons center'>report_problem</i>Entered passwords doesn't match!!!</h5>");
    }
    return register();
}

// socket

window.onload = function () {

    var nashContent = document.querySelector('.nash-content');
    var nashMsgInput = document.querySelector('#nash-message');
    var nashSendBtn = document.querySelector('#nash-sendbtn');

    var socket = io('http://127.0.0.1:3000');

    socket.emit('new user', {
        company: 'hayum',
        username: 'guest',
        id: this.id
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
};

