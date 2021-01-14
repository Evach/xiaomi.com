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
let goodsData = cookie.get("goods");console.log(good)
if(goodsData){
    goodsData = JSON.parse(goodsData);
    const idList = goodsData.map(elm=>elm.id);

    $.ajax({
        type: "get",
        url: "../../interface/getItem.php",
        data: {
            idList
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });
}


