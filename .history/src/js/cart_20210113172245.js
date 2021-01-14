import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
//判断用户是否已登录
if(cookie.get("isLogined")){
   $("#username").html(cookie.get("username"));
}
$(".user_name").hover(
    function(){
        $(this).siblings().css("height",164px)
    },
    function(){

    }
)