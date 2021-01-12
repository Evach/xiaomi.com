import './library/jquery-min.js';
import './library/jquery.md5.js';
import './library/jquery.lazyload.min.js';

$("#logBtn").on("click",function(){
    const username =$("#username").val();
    const pas = $("#password").val()
    if(username==""){
        $("#username").addClass("err");
        $("#log_tip_err").show().children("span").html("请输入帐号");
    }else if(pas=""){

    }
    $.ajax({
        method:"post",
        url:"../../interface/login.php",
        data:{
            username: username,
            password: pas
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

