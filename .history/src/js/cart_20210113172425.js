import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
//判断用户是否已登录
if(cookie.get("isLogined")){
   $("#username").html(cookie.get("username"));
}
$(".user_name,.user_menu_wrapper").hover(
    function(){
        $(this).siblings("ul").css("height","164px");
    },
    function(){
        $(this).siblings().css("height","0");
    }
)