import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
//判断用户是否已登录
if(cookie.get("isLogined")){
    $("#username").html(cookie.get("username"));
}else{
    $(".user_menu_wrapper").hide();
}

$(".user_name,.user_menu_wrapper").hover(
    function(){
        $(".user_menu_wrapper").css("height","164px");
    },
    function(){
        $(".user_menu_wrapper").css("height","0");
    }
);

//数据渲染 
let goodData


// $.ajax({
//     type: "get",
//     url: "../../interface/",
//     data: "data",
//     dataType: "dataType",
//     success: function (response) {
        
//     }
// });
