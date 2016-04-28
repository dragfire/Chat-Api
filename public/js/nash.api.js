/**
 * Created by dragfire on 27-04-2016.
 */

var $companyName;
var $email;
var $password;
var $cpassword;
var $msgBoard;

function register() {
    return !($companyName == '' || $email == '' || $password == '' || $cpassword == '' || $companyName == null || $email == null || $password == null || $cpassword == null);
}

function validate() {
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