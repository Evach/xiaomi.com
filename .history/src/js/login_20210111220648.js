import './library/jquery-min.js';
import './library/jquery.md5.js';
import './library/jquery.lazyload.min.js';

$("#logBtn").on("click",function(){
    let username =$("#username").val();
    const pas = $("#password").val()
    $.ajax({
        method:"post",
        url:"../../interface/login.php",
        data:{
            username: $("#username").val(),
            password: $("#password").val()
        },
        success:function(data){
            const $data  = JSON.parse(data);
            if($data.res){
                 location.href = "../index.html"
            }else{
                $("#log_tip_err").show().children("span").html("用户名或密码不正确");
                $("#username").addClass("err");
            }
        }
    });
})

