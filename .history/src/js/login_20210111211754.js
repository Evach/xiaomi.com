import './library/jquery-min.js';
import './library/jquery.md5.js';
import './library/jquery.lazyload.min.js';

$("#logBtn").on()

$.ajax({
    method:"post",
    url:"../../interface/login.php",
    data:{
        username: $("#username").val(),
        password: $("#password").val()
    },
    success:function(data){
        console.log(data)
    }
});