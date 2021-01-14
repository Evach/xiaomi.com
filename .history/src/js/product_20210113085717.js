import './library/jquery-min.js';
import {cookie} from "./library/cookie.js";
import './library/swiper-bundle.min.js';

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
    let loginBox = $("#loginNull")
    loginBox.show();
    $("#boxDel").on("click",function(){
        loginBox.hide();
    })
}else{
    $("#loginNull").hide();
}

// 加载产品信息
let proId = location.search.split("=")[1];
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id:proId
    },
    dataType: "json",
    success: function (data) {
        console.log(data)

    }
});

//  主图轮播
let index_swiper = new Swiper('.pro_swiper_wrapper', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: true,
    loop: true,
    pagination: {
      el: '.pro_swiper_pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.btn_next',
      prevEl: '.btn_prev',
    },
});

index_swiper.el.onmouseover = function(){
    index_swiper.autoplay.stop();
}
  

index_swiper.el.onmouseout = function(){
    index_swiper.autoplay.start();
}


