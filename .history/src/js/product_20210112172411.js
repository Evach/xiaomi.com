import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";


//页面内容模块化加载
$.get('./public/header.html',function(data){
    $(".header").html(data);
    let link_all = $(".link_all > a");
    link_all.removeClass("hide").siblings("ul").hide();
    $(".link_all > a, .link_all > ul").hover(
        function(){
            link_all.siblings("ul").show();
        },
        function(){
            link_all.siblings("ul").hide();
        }
    )
});                                                      



//判断用户是否已登录
if(!cookie.get("isLogined")){
    
}

let proId = location.search.split("=")[1];
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id:proId
    },
    dataType: "json",
    success: function (data) {
    }
});