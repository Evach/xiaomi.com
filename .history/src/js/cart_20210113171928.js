import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
//判断用户是否已登录
if(!cookie.get("isLogined")){
    let loginBox = $("#loginNull")
    loginBox.show();
    $("#boxDel").on("click",function(){
        loginBox.hide();
    })
}else{
    $("#loginNull").hide();
    
}
